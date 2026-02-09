"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookFlightButtonProps {
  flightId: string;
  from: string;
  to: string;
  price: number;
}

export default function BookFlightButton({ flightId, from, to, price }: BookFlightButtonProps) {
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const router = useRouter();

  const handleBook = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "flight",
          itemName: `Flight: ${from} → ${to}`,
          price,
        }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (res.ok) {
        const booking = await res.json();
        setBooked(true);
        // Redirect to payment page
        router.push(`/payment/${booking.id}`);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (booked) {
    return (
      <button disabled className="mt-2 bg-green-600 text-white px-4 py-2 rounded cursor-not-allowed">
        ✓ Booked! Redirecting...
      </button>
    );
  }

  return (
    <button
      onClick={handleBook}
      disabled={loading}
      className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded transition flex items-center gap-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Booking...
        </>
      ) : (
        "Book Ticket"
      )}
    </button>
  );
}
