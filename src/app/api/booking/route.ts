export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { type, itemName, price } = body;

    if (!type || !itemName || typeof price !== "number") {
      return new Response("Missing required fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        type,
        itemName,
        price,
        status: "pending",
      },
    });

    return Response.json(booking);
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
