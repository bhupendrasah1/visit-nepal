import { Globe2 } from "lucide-react";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold flex items-center gap-2">
        <Globe2 className="h-8 w-8 text-blue-600" aria-hidden="true" />
        Visit Nepal
      </h1>
      <p className="mt-4 text-gray-600">
        Explore destinations, plan trips, and discover Nepal.
      </p>
    </main>
  );
}
