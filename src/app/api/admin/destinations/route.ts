import { prisma } from "@/lib/prisma";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function geocodeLocation(name: string, region: string): Promise<{ lat: number; lng: number } | null> {
  try {
    // Use OpenStreetMap Nominatim for geocoding (free, no API key required)
    const query = encodeURIComponent(`${name}, ${region}, Nepal`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=np`,
      {
        headers: {
          "User-Agent": "VisitNepal/1.0 (tourism app)",
          "Accept": "application/json",
        },
        cache: "no-store",
      }
    );

    console.log("Geocoding query:", `${name}, ${region}, Nepal`);
    console.log("Geocoding response status:", response.status);

    if (!response.ok) {
      console.error("Geocoding failed with status:", response.status);
      return null;
    }

    const data = await response.json();
    console.log("Geocoding data:", JSON.stringify(data));
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    
    // If first query fails, try with just the name and Nepal
    const fallbackQuery = encodeURIComponent(`${name}, Nepal`);
    const fallbackResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${fallbackQuery}&format=json&limit=1&countrycodes=np`,
      {
        headers: {
          "User-Agent": "VisitNepal/1.0 (tourism app)",
          "Accept": "application/json",
        },
        cache: "no-store",
      }
    );

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      console.log("Fallback geocoding data:", JSON.stringify(fallbackData));
      if (fallbackData && fallbackData.length > 0) {
        return {
          lat: parseFloat(fallbackData[0].lat),
          lng: parseFloat(fallbackData[0].lon),
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const region = formData.get("region") as string;
    const description = formData.get("description") as string;
    const budgetStr = formData.get("budget") as string;
    const bestSeason = formData.get("bestSeason") as string;
    const latitudeStr = formData.get("latitude") as string;
    const longitudeStr = formData.get("longitude") as string;
    const hasAirport = formData.get("hasAirport") === "on";

    if (!name || !region || !description || !budgetStr || !bestSeason) {
      return new Response("Missing required fields", { status: 400 });
    }

    const budget = Number(budgetStr);
    if (isNaN(budget)) {
      return new Response("Invalid budget", { status: 400 });
    }

    const slug = generateSlug(name);

    // Check if slug already exists
    const existingDestination = await prisma.destination.findUnique({
      where: { slug },
    });

    if (existingDestination) {
      return new Response("A destination with this name already exists", { status: 400 });
    }

    // Use provided coordinates or geocode from name + region
    let latitude: number | null = latitudeStr && latitudeStr.trim() ? Number(latitudeStr) : null;
    let longitude: number | null = longitudeStr && longitudeStr.trim() ? Number(longitudeStr) : null;

    console.log("Initial coordinates:", { latitude, longitude, latitudeStr, longitudeStr });

    if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
      console.log("Geocoding for:", name, region);
      const coords = await geocodeLocation(name, region);
      console.log("Geocoded result:", coords);
      if (coords) {
        latitude = coords.lat;
        longitude = coords.lng;
      }
    }

    console.log("Final coordinates:", { latitude, longitude });

    const destination = await prisma.destination.create({
      data: {
        name,
        slug,
        description,
        region,
        budget,
        bestSeason,
        latitude,
        longitude,
        hasAirport,
        images: [],
      },
    });

    return Response.redirect(new URL("/admin/dashboard", req.url));
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
