import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { type, itemName, price } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const booking = await prisma.booking.create({
    data: {
      userId: user!.id,
      type,
      itemName,
      price,
      status: "pending",
    },
  });

  return Response.json(booking);
}
