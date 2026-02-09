import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PaymentPage({ params }: { params: { bookingId: string } }) {
  const { bookingId } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Booking not found</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  if (booking.status === "paid") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Already Paid!</h1>
          <p className="text-gray-600 mb-4">This booking has already been paid.</p>
          <Link href="/bookings" className="text-blue-600 hover:underline">
            View My Bookings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">💳 Complete Payment</h1>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Booking Details</p>
          <p className="font-semibold text-lg">{booking.itemName}</p>
          <p className="text-sm text-gray-500 mt-2">Type: {booking.type}</p>
        </div>

        <div className="border-t border-b py-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-2xl font-bold text-green-600">
              NPR {booking.price.toLocaleString()}
            </span>
          </div>
        </div>

        <form action="/api/payment" method="POST">
          <input type="hidden" name="bookingId" value={booking.id} />

          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>💳</span> Pay with eSewa / Khalti
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Your payment is secure and encrypted
        </p>

        <div className="mt-6 text-center">
          <Link href="/bookings" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel and return to bookings
          </Link>
        </div>
      </div>
    </main>
  );
}
