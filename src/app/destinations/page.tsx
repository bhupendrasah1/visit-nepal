import { prisma } from "@/lib/prisma";
import DestinationCard from "@/components/DestinationCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      region: true,
      budget: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="p-10 max-w-6xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
        <h1 className="text-4xl font-bold">Explore Destinations</h1>
        <Link
          href="/festivals"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition"
        >
          🇳🇵 Festival Events →
        </Link>
      </div>
      
      {destinations.length === 0 ? (
        <p className="text-gray-600">No destinations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              name={destination.name}
              slug={destination.slug}
              region={destination.region}
              budget={destination.budget}
            />
          ))}
        </div>
      )}
    </main>
  );
}
