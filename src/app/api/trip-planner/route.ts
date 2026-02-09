import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { budget } = await req.json();

    if (!budget || typeof budget !== "number") {
      return Response.json({ error: "Invalid budget" }, { status: 400 });
    }

    const destinations = await prisma.destination.findMany({
      where: {
        budget: { lte: budget },
      },
      take: 3,
    });

    return Response.json(destinations);
  } catch (error) {
    console.error("Trip planner error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
