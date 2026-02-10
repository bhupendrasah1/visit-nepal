export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function geocodeLocation(
  name: string,
  region: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const query = encodeURIComponent(`${name}, ${region}, Nepal`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=np`,
      {
        headers: {
          "User-Agent": "VisitNepal/1.0 (tourism app)",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data?.length > 0) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    }

    const fallbackQuery = encodeURIComponent(`${name}, Nepal`);
    const fallbackResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${fallbackQuery}&format=json&limit=1&countrycodes=np`,
      {
        headers: {
          "User-Agent": "VisitNepal/1.0 (tourism app)",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!fallbackResponse.ok) return null;

    const fallbackData = await fallbackResponse.json();
    if (fallbackData?.length > 0) {
      return {
        lat: Number(fallbackData[0].lat),
        lng: Number(fallbackData[0].lon),
      };
    }

    return null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const region = formData.get("region")?.toString();
    const description = formData.get("description")?.toString();
    const budgetStr = formData.get("budget")?.toString();
    const bestSeason = formData.get("bestSeason")?.toString();
    const latitudeStr = formData.get("latitude")?.toString();
    const longitudeStr = formData.get("longitude")?.toString();
    const hasAirport = Boolean(formData.get("hasAirport"));

    if (!name || !region || !description || !budgetStr || !bestSeason) {
      return new Response("Missing required fields", { status: 400 });
    }

    const budget = Number(budgetStr);
    if (Number.isNaN(budget)) {
      return new Response("Invalid budget", { status: 400 });
    }

    const slug = generateSlug(name);

    const existing = await prisma.destination.findUnique({
      where: { slug },
    });

    if (existing) {
      return new Response("Destination already exists", { status: 400 });
    }

    let latitude =
      latitudeStr && latitudeStr.trim() ? Number(latitudeStr) : null;
    let longitude =
      longitudeStr && longitudeStr.trim() ? Number(longitudeStr) : null;

    if (
      latitude === null ||
      longitude === null ||
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      const coords = await geocodeLocation(name, region);
      if (coords) {
        latitude = coords.lat;
        longitude = coords.lng;
      }
    }

    await prisma.destination.create({
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

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/admin/dashboard",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
