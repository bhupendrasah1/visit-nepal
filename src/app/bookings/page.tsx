import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function MyBookings() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const bookings = await prisma.booking.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">📖 My Bookings</h1>

      {bookings.map((b) => (
        <div key={b.id} className="border p-4 mb-3 rounded">
          <p><b>Type:</b> {b.type}</p>
          <p><b>Item:</b> {b.itemName}</p>
          <p><b>Price:</b> NPR {b.price}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={b.status === "paid" ? "text-green-600" : "text-orange-600"}>
              {b.status}
            </span>
          </p>
        </div>
      ))}

      
        {/* Back to Dashboard*/}
        <div className="mt-8 text-center">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        {/* Back to Flights*/}
        <div className="mt-8 text-center">
          <Link href="/flights" className="text-blue-600 hover:underline">
            ← Back to Flights
          </Link>
        </div>
    </main>
  );
}
