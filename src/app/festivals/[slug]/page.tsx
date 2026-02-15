import Image from "next/image";
import Link from "next/link";
import { PartyPopper, Sparkles } from "lucide-react";

type Festival = {
  slug: string;
  name: string;
  image: string;
  time: string;
  location: string;
  description: string;
  detailedDescription: string;
  highlights: string[];
  traditions: string[];
};

const festivals: Festival[] = [
  {
    slug: "dashain",
    name: "Dashain",
    image: "/images/dashain.jpg",
    time: "Sep–Oct",
    location: "Nationwide",
    description:
      "Nepal’s biggest festival celebrating the victory of good over evil with tika, blessings, bamboo swings, and family gatherings.",    detailedDescription:
      "Dashain is the longest and most auspicious festival in Nepal, lasting 15 days. It celebrates the victory of Goddess Durga over the buffalo demon Mahishasura, symbolizing the triumph of good over evil. Families reunite, elders bless younger ones with tika (a mixture of rice, yogurt, and vermillion), and communities gather to fly kites, enjoy bamboo swings (ping), and feast together. The festival begins with Ghatasthapana and culminates with Vijaya Dashami, the most sacred day.",
    highlights: [
      "Tika ceremony with blessings from elders",
      "Flying colorful kites across the valley",
      "Traditional bamboo swings (ping) in villages",
      "Grand animal sacrifices in temples",
      "Family feasts with special delicacies",
    ],
    traditions: [
      "Placing jamara (sacred barley shoots) during Ghatasthapana",
      "Receiving tika and blessings from elders on Vijaya Dashami",
      "Visiting temples like Naxal Bhagwati and Dakshinkali",
      "Wearing new clothes and sharing sel roti, meat curry, and sweets",
    ],  },
  {
    slug: "tihar",
    name: "Tihar (Deepawali)",
    image: "/images/tihar.jpg",
    time: "Oct–Nov",
    location: "Nationwide",
    description:
      "Festival of lights honoring animals, Laxmi Puja, and Bhai Tika with vibrant rangoli, lamps, and Deusi-Bhailo songs.",
    detailedDescription:
      "Tihar, also known as Deepawali or Yamapanchak, is a five-day festival of lights celebrated across Nepal. Each day honors different beings: crows, dogs, cows, oxen, and brothers. The third day is dedicated to Goddess Laxmi, when homes are illuminated with oil lamps and decorated with colorful rangoli. Groups of children and youth perform Deusi-Bhailo, singing traditional songs door-to-door. Bhai Tika on the final day celebrates the bond between brothers and sisters with blessings, garlands, and sweets.",
    highlights: [
      "Homes lit with thousands of oil lamps",
      "Colorful rangoli patterns at doorways",
      "Laxmi Puja with prayers for prosperity",
      "Deusi-Bhailo singing and dancing groups",
      "Bhai Tika ceremony between siblings",
    ],
    traditions: [
      "Worshiping crows, dogs, cows, and oxen on respective days",
      "Lighting diyas (oil lamps) to welcome Goddess Laxmi",
      "Creating intricate rangoli designs with colored powders",
      "Sisters blessing brothers with tika and garlands on Bhai Tika",
    ],
  },
  {
    slug: "holi",
    name: "Holi",
    image: "/images/holi.jpg",
    time: "Mar",
    location: "Kathmandu & Terai",
    description:
      "The festival of colors that welcomes spring with music, laughter, and joyful splashes of color in the streets.",
    detailedDescription:
      "Holi, the festival of colors, marks the arrival of spring and the victory of good over evil. Celebrated with vibrant colored powders (abir) and water, people of all ages gather in streets, parks, and open spaces to play, sing, and dance. The night before, bonfires are lit to symbolize the burning of evil spirits. In Nepal, Holi is especially vibrant in the Terai region and Kathmandu Valley, where communities come together in joyful celebration, breaking social barriers with color and laughter.",
    highlights: [
      "Colorful powder and water fights in public spaces",
      "Holika Dahan bonfire the night before",
      "Traditional music, drums, and dancing",
      "Special sweets like gujiya and ladoo",
      "Community gatherings breaking social barriers",
    ],
    traditions: [
      "Lighting bonfires (Holika Dahan) on the eve",
      "Throwing colored powders and water at friends and strangers",
      "Singing Holi songs and playing traditional instruments",
      "Visiting neighbors and sharing festive foods",
    ],
  },
  {
    slug: "teej",
    name: "Teej",
    image: "/images/teej.jpg",
    time: "Aug–Sep",
    location: "Kathmandu & Pashupatinath",
    description:
      "Women’s festival marked by fasting, red attire, devotional songs, and prayers for family well-being.",    detailedDescription:
      "Teej is a sacred festival celebrated by women across Nepal, dedicated to Goddess Parvati and Lord Shiva. Women dress in red saris, adorned with jewelry, and observe a strict fast (vrata) for the health and long life of their husbands or future spouses. The festival spans three days: Dar Khane Din (feasting), fasting day, and Rishi Panchami (purification). Women gather at temples, especially Pashupatinath, singing devotional songs and dancing. The festival emphasizes devotion, marital bliss, and spiritual cleansing.",
    highlights: [
      "Women in vibrant red attire and jewelry",
      "Strict 24-hour fasting without water",
      "Devotional songs and dancing at temples",
      "Grand gathering at Pashupatinath Temple",
      "Pre-fast feast (Dar Khane Din) with family",
    ],
    traditions: [
      "Feasting the night before the fast (Dar Khane Din)",
      "Observing nirjala vrata (fasting without water)",
      "Visiting Shiva temples and offering prayers",
      "Purification rituals on Rishi Panchami",
    ],  },
  {
    slug: "losar",
    name: "Losar",
    image: "/images/losar.jpg",
    time: "Feb–Mar",
    location: "Himalayan regions",
    description:
      "Tibetan New Year celebrated with monastery rituals, masked dances, and traditional family feasts.",
    detailedDescription:
      "Losar is the Tibetan New Year celebrated by Sherpa, Tamang, Gurung, and other Tibetan Buddhist communities in Nepal's Himalayan regions. The celebration lasts several days, beginning with cleaning homes, preparing special dishes, and making offerings at monasteries. Monks perform elaborate rituals, masked dances (Cham), and prayers for prosperity and peace. Families gather to share traditional foods like khapse (fried pastries), changkol (barley wine), and guthuk (dumpling soup). Losar is a time of renewal, gratitude, and community bonding.",
    highlights: [
      "Colorful masked dances (Cham) at monasteries",
      "Butter lamp offerings and prayers",
      "Traditional feasts with khapse and changkol",
      "Home cleaning and decoration rituals",
      "Community gatherings and blessings",
    ],
    traditions: [
      "Cleaning and decorating homes before New Year",
      "Offering butter lamps and prayers at monasteries",
      "Preparing traditional dishes like khapse and guthuk",
      "Watching Cham dances performed by monks",
    ],
  },
  {
    slug: "indrajatra",
    name: "Indra Jatra",
    image: "/images/indrajatra.jpg",
    time: "Sep",
    location: "Kathmandu Durbar Square",
    description:
      "Historic Newar festival featuring chariot processions, masked dances, and the living goddess Kumari.",
    detailedDescription:
      "Indra Jatra is an ancient Newar festival celebrated in Kathmandu Valley, honoring Lord Indra, the king of heaven, and commemorating deceased family members. The eight-day festival features grand chariot processions of the living goddess Kumari, Ganesh, and Bhairav through the streets of Kathmandu. Masked dancers perform Lakhey dances, and a towering wooden pole (lingo) is erected at Kathmandu Durbar Square. The festival blends Hindu and Buddhist traditions, showcasing the rich cultural heritage of the Newar community.",
    highlights: [
      "Kumari's chariot procession through Kathmandu",
      "Lakhey masked dance performances",
      "Erection of the sacred lingo pole",
      "Offerings at Hanuman Dhoka Palace",
      "Night processions with oil lamps",
    ],
    traditions: [
      "Erecting the wooden lingo pole at Kathmandu Durbar Square",
      "Performing Lakhey and other traditional mask dances",
      "Pulling chariots of Kumari, Ganesh, and Bhairav",
      "Honoring deceased family members with rituals",
    ],
  },
  {
    slug: "buddha-jayanti",
    name: "Buddha Jayanti",
    image: "/images/buddhajayanti.jpg",
    time: "May",
    location: "Lumbini & Buddhist stupas",
    description:
      "Commemorates the birth of Buddha with prayers, butter lamps, and peaceful pilgrimages.",
    detailedDescription:
      "Buddha Jayanti, also known as Buddha Purnima, commemorates the birth, enlightenment, and death of Gautama Buddha. Celebrated on the full moon day in May, this sacred day draws thousands of pilgrims to Lumbini, the birthplace of Buddha, and major Buddhist stupas like Swayambhunath and Boudhanath. Devotees light butter lamps, chant prayers, perform circumambulations (kora), and listen to teachings from monks. The atmosphere is peaceful, reflective, and deeply spiritual, emphasizing compassion, mindfulness, and enlightenment.",
    highlights: [
      "Mass pilgrimage to Lumbini's Maya Devi Temple",
      "Butter lamp offerings at stupas",
      "Meditation and prayer sessions",
      "Buddhist teachings and sermons",
      "Peaceful processions and kora (circumambulation)",
    ],
    traditions: [
      "Lighting thousands of butter lamps at stupas",
      "Visiting Lumbini and major Buddhist sites",
      "Performing kora (circumambulation) around stupas",
      "Listening to teachings on Buddha's life and philosophy",
    ],
  },
  {
    slug: "gai-jatra",
    name: "Gai Jatra",
    image: "/images/gaijatra.jpg",
    time: "Aug",
    location: "Kathmandu Valley",
    description:
      "Festival of cows honoring the deceased with lively processions, satire, and community performances.",
    detailedDescription:
      "Gai Jatra, the festival of cows, is a unique Newar festival observed in Kathmandu Valley to honor those who died in the past year. Families who lost loved ones lead cows (or children dressed as cows) in processions, believing that cows guide souls to the afterlife. The festival blends mourning with humor, featuring satirical plays, comedy performances, and social commentary. Originating from a legend about a grieving king, Gai Jatra has evolved into a celebration of life, death, and the freedom of expression.",
    highlights: [
      "Processions of cows and children dressed as cows",
      "Satirical plays and street performances",
      "Social and political commentary through humor",
      "Community gatherings and laughter",
      "Honoring deceased family members",
    ],
    traditions: [
      "Leading cows in processions to honor the deceased",
      "Performing satirical plays and comedy skits",
      "Using humor to cope with grief and loss",
      "Publishing satirical magazines and cartoons",
    ],
  },
];

export default async function FestivalDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const festival = festivals.find((f) => f.slug === slug);

  if (!festival) {
    return <div className="p-10 text-center">Festival not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/festivals" className="text-red-600 mb-4 inline-block">
        ← Back to Festivals
      </Link>

      <h1 className="text-3xl font-bold mb-6">{festival.name}</h1>

      <Image
        src={festival.image}
        alt={festival.name}
        width={800}
        height={500}
        className="rounded-xl mb-6"
      />

      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
        <span className="rounded-full bg-red-100 text-red-700 px-3 py-1">
          {festival.time}
        </span>
        <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1">
          {festival.location}
        </span>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">About {festival.name}</h2>
        <p className="text-gray-700 leading-relaxed">{festival.detailedDescription}</p>

        <h3 className="text-xl font-semibold mt-8 mb-3">Festival Highlights</h3>
        <ul className="space-y-2">
          {festival.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <PartyPopper className="h-4 w-4 text-red-500 mt-1" aria-hidden="true" />
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-3">Traditions & Rituals</h3>
        <ul className="space-y-2">
          {festival.traditions.map((tradition, index) => (
            <li key={index} className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-red-500 mt-1" aria-hidden="true" />
              <span className="text-gray-700">{tradition}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
