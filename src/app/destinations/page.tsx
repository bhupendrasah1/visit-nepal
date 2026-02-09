import { prisma } from "@/lib/prisma";
import DestinationCard from "@/components/DestinationCard";

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
      <h1 className="text-4xl font-bold mb-8">Explore Destinations</h1>
      
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
