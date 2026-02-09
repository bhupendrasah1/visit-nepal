import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminVehicles() {
  const [destinations, vehicles] = await Promise.all([
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
    prisma.vehicle.findMany({ include: { destination: true }, orderBy: { type: "asc" } }),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">🚗 Add Vehicle</h1>
          <p className="text-gray-600 mt-1">Add transport options for destinations</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {destinations.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800 font-medium mb-4">⚠️ No destinations available</p>
            <p className="text-yellow-700 mb-4">You need to add a destination before adding vehicles.</p>
            <Link href="/admin/destinations" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition inline-block">
              Add Destination First
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <form action="/api/admin/vehicles" method="POST" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type *</label>
                <select
                  name="type"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Car">🚗 Car</option>
                  <option value="Jeep">🚙 Jeep</option>
                  <option value="Bus">🚌 Bus</option>
                  <option value="Van">🚐 Van</option>
                  <option value="Motorcycle">🏍️ Motorcycle</option>
                  <option value="Bicycle">🚲 Bicycle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Day (NPR) *</label>
                <input
                  name="pricePerDay"
                  type="number"
                  placeholder="e.g., 3000"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                <select
                  name="destinationId"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-500"
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
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition"
                >
                  Add Vehicle
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

        {/* Existing Vehicles */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold">Existing Vehicles ({vehicles.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Day</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{vehicle.type}</td>
                    <td className="px-6 py-4 text-gray-600">{vehicle.destination.name}</td>
                    <td className="px-6 py-4 text-yellow-600">NPR {vehicle.pricePerDay.toLocaleString()}</td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No vehicles added yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
