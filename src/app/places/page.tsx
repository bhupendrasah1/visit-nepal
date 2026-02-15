"use client";

import Image from "next/image";
import Link from "next/link";

type Place = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

const places: Place[] = [
  {
    slug: "kathmandu",
    name: "Kathmandu",
    image: "/images/kathmandu.jpg",
    description:
      "Kathmandu is the capital city of Nepal, rich in culture and temples.",
  },
  {
    slug: "pokhara",
    name: "Pokhara",
    image: "/images/pokhara.jpg",
    description:
      "Pokhara is famous for lakes, mountains and adventure tourism.",
  },
  {
    slug: "lumbini",
    name: "Lumbini",
    image: "/images/lumbini.jpg",
    description:
      "Lumbini is the birthplace of Lord Buddha.",
  },
  {
    slug: "sagarmatha",
    name: "Sagarmatha",
    image: "/images/sagarmatha.jpg",
    description:
      "Sagarmatha National Park is home to Mount Everest.",
  },
  {
    slug: "chitwan",
    name: "Chitwan",
    image: "/images/chitwan.jpg",
    description:
      "Chitwan is famous for jungle safari and wildlife.",
  },
  {
    slug: "janakpur",
    name: "Janakpur",
    image: "/images/janakpur.jpg",
    description:
      "Janakpur is the birthplace of Goddess Sita.",
  },
];

export default function PlacePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Beautiful Places of Nepal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place, index) => (
          <Link
            key={index}
            href={`/places/${place.slug}`}
            className="border rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer p-4"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-xl font-bold mt-4">
              {place.name}
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              {place.description}
            </p>

            <div className="mt-4 text-blue-600 font-medium">
              Explore →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
