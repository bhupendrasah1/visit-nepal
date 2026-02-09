import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminFlights() {
  const flights = await prisma.flight.findMany({
    orderBy: { from: "asc" },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">✈️ Add Flight</h1>
          <p className="text-gray-600 mt-1">Add domestic flight routes</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form action="/api/admin/flights" method="POST" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From (Airport Code) *</label>
                <input
                  name="from"
                  placeholder="e.g., KTM (Kathmandu)"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To (Airport Code) *</label>
                <input
                  name="to"
                  placeholder="e.g., PKR (Pokhara)"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (NPR) *</label>
                <input
                  name="price"
                  type="number"
                  placeholder="e.g., 8000"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                <input
                  name="duration"
                  placeholder="e.g., 25 min"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Add Flight
              </button>
              <Link
                href="/admin/dashboard"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Common Nepal Routes Reference */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">📍 Common Nepal Airport Codes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-700">
            <span>KTM - Kathmandu</span>
            <span>PKR - Pokhara</span>
            <span>BWA - Bhairahawa</span>
            <span>BIR - Biratnagar</span>
            <span>JKR - Janakpur</span>
            <span>LUA - Lukla</span>
            <span>JMO - Jomsom</span>
            <span>SIF - Simara</span>
          </div>
        </div>

        {/* Existing Flights */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold">Existing Flights ({flights.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {flights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{flight.from} → {flight.to}</td>
                    <td className="px-6 py-4 text-gray-600">{flight.duration}</td>
                    <td className="px-6 py-4 text-purple-600">NPR {flight.price.toLocaleString()}</td>
                  </tr>
                ))}
                {flights.length === 0 && (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No flights added yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

