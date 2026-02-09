import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const pricePerNightStr = formData.get("pricePerNight") as string;
    const ratingStr = formData.get("rating") as string;
    const destinationId = formData.get("destinationId") as string;

    if (!name || !pricePerNightStr || !ratingStr || !destinationId) {
      return new Response("Missing fields", { status: 400 });
    }

    const hotel = await prisma.hotel.create({
      data: {
        name,
        pricePerNight: Number(pricePerNightStr),
        rating: Number(ratingStr),
        destinationId,
      },
    });

    return Response.redirect(new URL("/admin/dashboard", req.url));
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
