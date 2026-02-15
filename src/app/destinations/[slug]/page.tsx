import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ClientMap from "@/components/ClientMap";
import { unstable_cache } from "next/cache";
import { Banknote, Car, Hotel, Star, Sun } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

const getDestination = unstable_cache(
  async (slug: string) => {
    return prisma.destination.findUnique({
      where: { slug },
      include: {
        hotels: true,
        vehicles: true,
      },
    });
  },
  ["destination-detail"],
  { revalidate: 60 }
);

const canShowMap = (destination: {
  latitude?: number | null;
  longitude?: number | null;
  name?: string | null;
  region?: string | null;
}) =>
  (destination.latitude != null && destination.longitude != null) ||
  (destination.name && destination.region);

export default async function DestinationDetail({ params }: Props) {
  const { slug } = await params;
  
  const destination = await getDestination(slug);

  if (!destination) {
    notFound();
  }

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold">
        {destination.name}
      </h1>

      <p className="mt-2 text-gray-600">
        Region: {destination.region}
      </p>

      <p className="mt-4">
        {destination.description}
      </p>

      <div className="mt-6 space-y-2">
        <p className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-orange-500" aria-hidden="true" />
          Best Season: {destination.bestSeason}
        </p>
        <p className="flex items-center gap-2">
          <Banknote className="h-4 w-4 text-green-600" aria-hidden="true" />
          Budget: NPR {destination.budget}
        </p>
      </div>

      {canShowMap(destination) && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Location</h2>

    <ClientMap
      lat={destination.latitude}
      lng={destination.longitude}
      placeName={`${destination.name}, ${destination.region}`}
    />

    <a
      href={
        destination.latitude != null && destination.longitude != null
          ? `https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${destination.name}, ${destination.region}`
            )}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      Open in Google Maps
    </a>
  </div>
)}


      <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
        <Hotel className="h-5 w-5 text-green-600" aria-hidden="true" />
        Hotels
      </h2>
      {destination.hotels.length === 0 ? (
        <p className="text-gray-500">No hotels available for this destination yet.</p>
      ) : (
        destination.hotels.map(h => (
          <p key={h.id} className="flex flex-wrap items-center gap-2">
            <span>{h.name} – NPR {h.pricePerNight}/night</span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" aria-hidden="true" />
              {h.rating}
            </span>
          </p>
        ))
      )}

      <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
        <Car className="h-5 w-5 text-yellow-600" aria-hidden="true" />
        Vehicles
      </h2>
      {destination.vehicles.length === 0 ? (
        <p className="text-gray-500">No vehicles available for this destination yet.</p>
      ) : (
        destination.vehicles.map(v => (
          <p key={v.id}>
            {v.type} – NPR {v.pricePerDay}/day
          </p>
        ))
      )}

    </main>
  );
}
