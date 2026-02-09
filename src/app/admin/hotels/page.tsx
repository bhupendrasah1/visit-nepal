import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminHotels() {
  const [destinations, hotels] = await Promise.all([
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
    prisma.hotel.findMany({ include: { destination: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">🏨 Add Hotel</h1>
          <p className="text-gray-600 mt-1">Add accommodation options for destinations</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {destinations.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800 font-medium mb-4">⚠️ No destinations available</p>
            <p className="text-yellow-700 mb-4">You need to add a destination before adding hotels.</p>
            <Link href="/admin/destinations" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition inline-block">
              Add Destination First
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <form action="/api/admin/hotels" method="POST" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
                <input
                  name="name"
                  placeholder="e.g., Hotel Lakeside"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night (NPR) *</label>
                  <input
                    name="pricePerNight"
                    type="number"
                    placeholder="e.g., 5000"
                    required
                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5) *</label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="e.g., 4.5"
                    required
                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                <select
                  name="destinationId"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Destination</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
                >
                  Add Hotel
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
        )}

        {/* Existing Hotels */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold">Existing Hotels ({hotels.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Night</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{hotel.name}</td>
                    <td className="px-6 py-4 text-gray-600">{hotel.destination.name}</td>
                    <td className="px-6 py-4 text-green-600">NPR {hotel.pricePerNight.toLocaleString()}</td>
                    <td className="px-6 py-4">⭐ {hotel.rating}</td>
                  </tr>
                ))}
                {hotels.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No hotels added yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
