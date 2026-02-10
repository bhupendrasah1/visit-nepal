import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type BookingWithUser = Prisma.BookingGetPayload<{ include: { user: true } }>;

export default async function AdminDashboard() {
  const [destinations, hotels, vehicles, flights, bookings, totalBookings] = await Promise.all([
    prisma.destination.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.hotel.findMany({ include: { destination: true } }),
    prisma.vehicle.findMany({ include: { destination: true } }),
    prisma.flight.findMany(),
    prisma.booking.findMany({ 
      orderBy: { createdAt: "desc" }, 
      take: 10,
      include: { user: true }
    }),
    prisma.booking.count(),
  ]);

  const stats = [
    { label: "Destinations", count: destinations.length, icon: "🏔️", color: "bg-blue-500", href: "/admin/destinations" },
    { label: "Hotels", count: hotels.length, icon: "🏨", color: "bg-green-500", href: "/admin/hotels" },
    { label: "Vehicles", count: vehicles.length, icon: "🚗", color: "bg-yellow-500", href: "/admin/vehicles" },
    { label: "Flights", count: flights.length, icon: "✈️", color: "bg-purple-500", href: "/admin/flights" },
    { label: "Bookings", count: totalBookings, icon: "📋", color: "bg-pink-500", href: "/bookings" },
  ];
    const quickActions = [
  { label: "Add Destination", icon: "🏔️", color: "bg-blue-600 hover:bg-blue-700", href: "/admin/destinations" },
  { label: "Add Hotel", icon: "🏨", color: "bg-green-600 hover:bg-green-700", href: "/admin/hotels" },
  { label: "Add Vehicle", icon: "🚗", color: "bg-yellow-600 hover:bg-yellow-700", href: "/admin/vehicles" },
  { label: "Add Flight", icon: "✈️", color: "bg-purple-600 hover:bg-purple-700", href: "/admin/flights" },
];


  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">🇳🇵 Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your Visit Nepal platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-3`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`${action.color} text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 text-center`}
              >
                <span className="text-2xl">{action.icon}</span>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                📋 Recent Bookings ({totalBookings})
              </h2>
              <Link href="/bookings" className="text-blue-600 hover:underline text-sm">
                View All →
              </Link>
            </div>
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No bookings yet</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {bookings.map((booking: BookingWithUser) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.itemName}</p>
                      <p className="text-sm text-gray-500">{booking.type} • {booking.user?.name || booking.user?.email || 'Unknown'}</p>
                      <p className="text-xs text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">NPR {booking.price.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'paid' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Destinations */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                🏔️ Recent Destinations
              </h2>
              <Link href="/admin/destinations" className="text-blue-600 hover:underline text-sm">
                Manage →
              </Link>
            </div>
            {destinations.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No destinations yet</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {destinations.slice(0, 5).map((dest) => (
                  <Link key={dest.id} href={`/destinations/${dest.slug}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div>
                      <p className="font-medium">{dest.name}</p>
                      <p className="text-sm text-gray-500">{dest.region}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">NPR {dest.budget.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{dest.bestSeason}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Data Tables */}
        <div className="mt-8 space-y-8">
          {/* Hotels Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold">🏨 Hotels ({hotels.length})</h2>
              <Link href="/admin/hotels" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition">
                + Add Hotel
              </Link>
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
                  {hotels.slice(0, 5).map((hotel) => (
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

          {/* Vehicles Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold">🚗 Vehicles ({vehicles.length})</h2>
              <Link href="/admin/vehicles" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition">
                + Add Vehicle
              </Link>
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
                  {vehicles.slice(0, 5).map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{vehicle.type}</td>
                      <td className="px-6 py-4 text-gray-600">{vehicle.destination.name}</td>
                      <td className="px-6 py-4 text-blue-600">NPR {vehicle.pricePerDay.toLocaleString()}</td>
                    </tr>
                  ))}
                  {vehicles.length === 0 && (
                    <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No vehicles added yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Flights Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold">✈️ Flights ({flights.length})</h2>
              <Link href="/admin/flights" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition">
                + Add Flight
              </Link>
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
                  {flights.slice(0, 5).map((flight) => (
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

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
