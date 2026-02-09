import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const priceStr = formData.get("price") as string;
    const duration = formData.get("duration") as string;

    if (!from || !to || !priceStr || !duration) {
      return new Response("Missing fields", { status: 400 });
    }

    const price = Number(priceStr);

    if (isNaN(price)) {
      return new Response("Invalid price", { status: 400 });
    }

    const flight = await prisma.flight.create({
      data: {
        from,
        to,
        price,
        duration,
      },
    });

    return Response.redirect(new URL("/flights", req.url));
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
