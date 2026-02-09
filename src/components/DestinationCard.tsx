import Link from "next/link";

type Props = {
  name: string;
  slug: string;
  region: string;
  budget: number;
};

export default function DestinationCard({
  name,
  slug,
  region,
  budget,
}: Props) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className="border rounded-lg p-4 hover:shadow-md transition"
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{region}</p>
      <p className="mt-2 font-medium">Budget: NPR {budget}</p>
    </Link>
  );
}
