export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const type = formData.get("type")?.toString();
    const pricePerDayStr = formData.get("pricePerDay")?.toString();
    const destinationId = formData.get("destinationId")?.toString();

    if (!type || !pricePerDayStr || !destinationId) {
      return new Response("Missing fields", { status: 400 });
    }

    const pricePerDay = Number(pricePerDayStr);
    if (Number.isNaN(pricePerDay)) {
      return new Response("Invalid price", { status: 400 });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
    });

    if (!destination) {
      return new Response("Destination not found", { status: 404 });
    }

    await prisma.vehicle.create({
      data: {
        type,
        pricePerDay,
        destinationId,
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
