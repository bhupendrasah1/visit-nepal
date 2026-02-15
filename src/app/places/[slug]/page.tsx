import Image from "next/image";
import Link from "next/link";
import ClientMap from "@/components/ClientMap";

type Place = {
  slug: string;
  name: string;
  image: string;
  description: string;
  bestPlaces: string[];
  latitude?: number;
  longitude?: number;
};

const places: Place[] = [
  {
    slug: "kathmandu",
    name: "Kathmandu",
    image: "/images/kathmandu.jpg",
    description:
      "Kathmandu is the capital city of Nepal, rich in culture and temples.",
    latitude: 27.7172,
    longitude: 85.324,
    bestPlaces: [
      "Pashupatinath Temple",
      "Boudhanath Stupa",
      "Swayambhunath",
      "Kathmandu Durbar Square",
    ],
  },
  {
    slug: "pokhara",
    name: "Pokhara",
    image: "/images/pokhara.jpg",
    description:
      "Pokhara is famous for lakes, mountains and adventure tourism.",
    latitude: 28.2096,
    longitude: 83.9856,
    bestPlaces: [
      "Phewa Lake",
      "Sarangkot",
      "Devi's Fall",
      "World Peace Pagoda",
    ],
  },
  {
    slug: "lumbini",
    name: "Lumbini",
    image: "/images/lumbini.jpg",
    description:
      "Lumbini is the birthplace of Lord Buddha.",
    latitude: 27.4698,
    longitude: 83.2767,
    bestPlaces: [
      "Maya Devi Temple",
      "Ashoka Pillar",
      "Sacred Garden",
    ],
  },
  {
    slug: "sagarmatha",
    name: "Sagarmatha",
    image: "/images/sagarmatha.jpg",
    description:
      "Sagarmatha National Park is home to Mount Everest.",
    latitude: 27.932,
    longitude: 86.805,
    bestPlaces: [
      "Mount Everest",
      "Namche Bazaar",
      "Tengboche Monastery",
    ],
  },
  {
    slug: "chitwan",
    name: "Chitwan",
    image: "/images/chitwan.jpg",
    description:
      "Chitwan is famous for jungle safari and wildlife.",
    latitude: 27.5291,
    longitude: 84.3542,
    bestPlaces: [
      "Chitwan National Park",
      "Elephant Safari",
      "Rapti River",
    ],
  },
  {
    slug: "janakpur",
    name: "Janakpur",
    image: "/images/janakpur.jpg",
    description:
      "Janakpur is the birthplace of Goddess Sita.",
    latitude: 26.7285,
    longitude: 85.925,
    bestPlaces: [
      "Janaki Temple",
      "Dhanush Sagar",
      "Ganga Sagar",
    ],
  },
];

export default async function PlaceDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((p) => p.slug === slug);

  if (!place) {
    return <div className="p-10 text-center">Place not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link
        href="/places"
        className="text-blue-600 mb-4 inline-block"
      >
        ← Back to Places
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        {place.name}
      </h1>

      <Image
        src={place.image}
        alt={place.name}
        width={800}
        height={500}
        className="rounded-xl mb-6"
      />

      <p className="mb-6">{place.description}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Location</h2>
        <a
          href={
            place.latitude != null && place.longitude != null
              ? `https://www.google.com/maps?q=${place.latitude},${place.longitude}`
              : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${place.name}, Nepal`
                )}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative">
            <ClientMap
              lat={place.latitude}
              lng={place.longitude}
              placeName={place.name}
            />
            <div className="pointer-events-none absolute inset-0 rounded bg-black/0 group-hover:bg-black/10 transition" />
          </div>
          <div className="mt-2 text-sm text-blue-600 font-medium">Open in Google Maps →</div>
        </a>
      </div>

      <h2 className="text-xl font-semibold mb-3">
        Best Places to Visit:
      </h2>

      <ul className="list-disc ml-6">
        {place.bestPlaces.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
