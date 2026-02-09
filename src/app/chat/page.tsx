"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // 🔹 Load chat history on first render
  useEffect(() => {
    if (status !== "authenticated") return;
    
    fetch("/api/chat/history")
      .then(res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) return;
        const formatted: Message[] = data.flatMap((c: any) => [
          { role: "user" as const, text: c.userMessage },
          { role: "bot" as const, text: c.botReply },
        ]);
        setMessages(formatted);
      })
      .catch(() => {
        // Silently fail if chat history can't be loaded
      });
  }, [status]);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    const userInput = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages(prev => [...prev, { role: "bot", text: data.error || "Something went wrong" }]);
        return;
      }

      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Failed to send message. Please try again." }]);
    }
  }

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="max-w-2xl mx-auto p-6 flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🇳🇵 Nepal Tourism Chatbot</h1>

      <div className="border rounded-lg p-4 h-[400px] overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded w-full p-2"
          placeholder="Ask about Pokhara, hotels, best season..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>

      <button
  onClick={async () => {
    await fetch("/api/chat/clear", { method: "DELETE" });
    setMessages([]);
  }}
  className="text-sm text-red-600 border px-3 py-1 rounded"
>
  Clear Chat
</button>

    </div>
  );
}
