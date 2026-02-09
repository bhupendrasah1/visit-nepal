import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDestinations() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">🏔️ Add Destination</h1>
          <p className="text-gray-600 mt-1">Create a new travel destination</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Destination Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form action="/api/admin/destinations" method="POST" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name *</label>
                <input
                  name="name"
                  placeholder="e.g., Pokhara"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                <input
                  name="region"
                  placeholder="e.g., Gandaki, Bagmati, Koshi"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                placeholder="Write a compelling description of the destination..."
                required
                rows={4}
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (NPR) *</label>
                <input
                  name="budget"
                  type="number"
                  placeholder="Average trip cost"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best Season *</label>
                <select
                  name="bestSeason"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Season</option>
                  <option value="Spring (Mar-May)">Spring (Mar-May)</option>
                  <option value="Autumn (Sep-Nov)">Autumn (Sep-Nov)</option>
                  <option value="Summer (Jun-Aug)">Summer (Jun-Aug)</option>
                  <option value="Winter (Dec-Feb)">Winter (Dec-Feb)</option>
                  <option value="Year Round">Year Round</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input
                  name="latitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 28.2096"
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input
                  name="longitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 83.9856"
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasAirport"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Has Airport</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Add Destination
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

        {/* Existing Destinations */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold">Existing Destinations ({destinations.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airport</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {destinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      <Link href={`/destinations/${dest.slug}`} className="text-blue-600 hover:underline">
                        {dest.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{dest.region}</td>
                    <td className="px-6 py-4 text-green-600">NPR {dest.budget.toLocaleString()}</td>
                    <td className="px-6 py-4">{dest.hasAirport ? '✅' : '❌'}</td>
                  </tr>
                ))}
                {destinations.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No destinations added yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
