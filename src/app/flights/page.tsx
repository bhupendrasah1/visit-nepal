import { prisma } from "@/lib/prisma";
import BookFlightButton from "@/components/BookFlightButton";

export default async function FlightsPage() {
  const flights = await prisma.flight.findMany();

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">✈️ Available Flights</h1>
        <p className="text-gray-600 mb-8">Book domestic flights across Nepal</p>

        {flights.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500">No flights available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {flights.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-gray-800">{f.from}</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="h-[2px] flex-1 bg-gray-300"></div>
                        <span className="text-gray-400">✈️</span>
                        <div className="h-[2px] flex-1 bg-gray-300"></div>
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{f.to}</span>
                    </div>
                    <p className="text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        🕐 Duration: {f.duration}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price per person</p>
                      <p className="text-2xl font-bold text-green-600">
                        NPR {f.price.toLocaleString()}
                      </p>
                    </div>
                    <BookFlightButton
                      flightId={f.id}
                      from={f.from}
                      to={f.to}
                      price={f.price}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
