import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="font-bold text-xl">
        🇳🇵 Visit Nepal
      </Link>

      <div className="space-x-4">
        <Link href="/destinations">Destinations</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
