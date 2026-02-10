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
    const destinationId = body?.destinationId;

    if (!destinationId) {
      return new Response("Missing destinationId", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    await prisma.wishlist.upsert({
      where: {
        userId_destinationId: {
          userId: user.id,
          destinationId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        destinationId,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
