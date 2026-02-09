import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();
  const bookingId = formData.get("bookingId") as string;

  if (!bookingId) {
    return new Response("Missing booking ID", { status: 400 });
  }

  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "paid" },
    });

    return Response.redirect(new URL("/bookings", req.url));
  } catch (error) {
    console.error(error);
    return new Response("Payment failed", { status: 500 });
  }
}
