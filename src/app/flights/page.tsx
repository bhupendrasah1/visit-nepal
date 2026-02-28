import { prisma } from "@/lib/prisma";
import BookFlightButton from "@/components/BookFlightButton";
import { Clock, Plane } from "lucide-react";

export default async function FlightsPage() {
  const flights = await prisma.flight.findMany();

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Plane className="h-7 w-7 text-purple-600" aria-hidden="true" />
          Available Flights
        </h1>
        <p className="text-gray-600 mb-8">Book domestic flights across Nepal</p>

        {flights.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500">No flights available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {flights.map((f) => (
              <div
                key={f.id ?? Math.random()}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-gray-800">{f.from ?? "Unknown"}</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="h-[2px] flex-1 bg-gray-300"></div>
                        <Plane className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        <div className="h-[2px] flex-1 bg-gray-300"></div>
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{f.to ?? "Unknown"}</span>
                    </div>
                    <p className="text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" aria-hidden="true" />
                        Duration: {f.duration ?? "-"}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price per person</p>
                      <p className="text-2xl font-bold text-green-600">
                        NPR {f.price?.toLocaleString?.() ?? "-"}
                      </p>
                    </div>
                    <BookFlightButton
                      flightId={f.id ?? ""}
                      from={f.from ?? ""}
                      to={f.to ?? ""}
                      price={f.price ?? 0}
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
