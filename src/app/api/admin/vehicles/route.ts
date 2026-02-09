import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const type = formData.get("type") as string;
    const pricePerDayStr = formData.get("pricePerDay") as string;
    const destinationId = formData.get("destinationId") as string;

    if (!type || !pricePerDayStr || !destinationId) {
      return new Response("Missing fields", { status: 400 });
    }

    const price = Number(pricePerDayStr);

    if (isNaN(price)) {
      return new Response("Invalid price", { status: 400 });
    }

    // Check destination exists
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
    });

    if (!destination) {
      return new Response("Destination not found", { status: 404 });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        type,
        pricePerDay: price,
        destinationId,
      },
    });

    return Response.redirect(new URL("/admin/dashboard", req.url));
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
