import Link from "next/link";
import Image from "next/image";

type Festival = {
  id: string;
  slug: string;
  name: string;
  image: string;
  time: string;
  location: string;
  description: string;
};

const festivals = [
  {
    id: "dashain",
    slug: "dashain",
    name: "Dashain",
    image:"/images/dashain.jpg",
    time: "Sep–Oct",
    location: "Nationwide",
    description:
      "Nepal’s biggest festival celebrating the victory of good over evil with tika, blessings, bamboo swings, and family gatherings.",
    
  },
  {
    id: "tihar",
    slug: "tihar",
    name: "Tihar (Deepawali)",
    time: "Oct–Nov",
    location: "Nationwide",
    description:
      "Festival of lights honoring animals, Laxmi Puja, and Bhai Tika with vibrant rangoli, lamps, and Deusi-Bhailo songs.",
    image:"/images/tihar.jpg",
  },
  {
    id: "holi",
    slug: "holi",
    name: "Holi",
    time: "Mar",
    location: "Kathmandu & Terai",
    description:
      "The festival of colors that welcomes spring with music, laughter, and joyful splashes of color in the streets.",
    image:"/images/holi.jpg",
  },
  {
    id: "teej",
    slug: "teej",
    name: "Teej",
    time: "Aug–Sep",
    location: "Kathmandu & Pashupatinath",
    description:
      "Women’s festival marked by fasting, red attire, devotional songs, and prayers for family well-being.",
    image:"/images/teej.jpg",
  },
  {
    id: "losar",
    slug: "losar",
    name: "Losar",
    time: "Feb–Mar",
    location: "Himalayan regions",
    description:
      "Tibetan New Year celebrated with monastery rituals, masked dances, and traditional family feasts.",
    image:"/images/losar.jpg",
  },
  {
    id: "indrajatra",
    slug: "indrajatra",
    name: "Indra Jatra",
    time: "Sep",
    location: "Kathmandu Durbar Square",
    description:
      "Historic Newar festival featuring chariot processions, masked dances, and the living goddess Kumari.",
    image:"/images/indrajatra.jpg",
  },
  {
    id: "buddha-jayanti",
    slug: "buddha-jayanti",
    name: "Buddha Jayanti",
    time: "May",
    location: "Lumbini & Buddhist stupas",
    description:
      "Commemorates the birth of Buddha with prayers, butter lamps, and peaceful pilgrimages.",
    image:"/images/buddhajayanti.jpg",
  },
  {
    id: "gai-jatra",
    slug: "gai-jatra",
    name: "Gai Jatra",
    time: "Aug",
    location: "Kathmandu Valley",
    description:
      "Festival of cows honoring the deceased with lively processions, satire, and community performances.",
    image:"/images/gaijatra.jpg",
  },
  
 
];

export default function FestivalsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-500">Nepal Festivals</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Festival Events You Shouldn’t Miss</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Discover the most vibrant celebrations in Nepal, with the best time to visit and a quick taste of the tradition.
            </p>
          </div>
          <Link href="/destinations" className="text-red-600 font-semibold hover:underline">
            ← Back to Destinations
          </Link>
          <Link href="/admin/dashboard" className="text-red-600 font-semibold hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.map((festival) => (
            <Link
              key={festival.id}
              href={`/festivals/${festival.slug}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-red-100 block"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={festival.image}
                  alt={festival.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {festival.time}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{festival.name}</h2>
                  <p className="text-sm text-gray-500">{festival.location}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{festival.description}</p>
                <div className="flex items-center gap-2 text-xs text-red-600 font-semibold">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                  Best time: {festival.time}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
