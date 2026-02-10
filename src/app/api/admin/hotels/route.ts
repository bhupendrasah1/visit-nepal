// Must be at the very top
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const pricePerNightStr = formData.get("pricePerNight")?.toString();
    const ratingStr = formData.get("rating")?.toString();
    const destinationId = formData.get("destinationId")?.toString();

    if (!name || !pricePerNightStr || !ratingStr || !destinationId) {
      return new Response("Missing fields", { status: 400 });
    }

    const pricePerNight = Number(pricePerNightStr);
    const rating = Number(ratingStr);

    if (Number.isNaN(pricePerNight) || Number.isNaN(rating)) {
      return new Response("Invalid number values", { status: 400 });
    }

    // Create hotel in database
    await prisma.hotel.create({
      data: {
        name,
        pricePerNight,
        rating,
        destinationId,
      },
    });

    // Stable redirect for API route
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
