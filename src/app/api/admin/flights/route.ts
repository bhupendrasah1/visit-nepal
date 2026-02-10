export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const from = formData.get("from")?.toString();
    const to = formData.get("to")?.toString();
    const priceStr = formData.get("price")?.toString();
    const duration = formData.get("duration")?.toString();

    if (!from || !to || !priceStr || !duration) {
      return new Response("Missing fields", { status: 400 });
    }

    const price = Number(priceStr);
    if (Number.isNaN(price)) {
      return new Response("Invalid price", { status: 400 });
    }

    await prisma.flight.create({
      data: {
        from,
        to,
        price,
        duration,
      },
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/flights",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
