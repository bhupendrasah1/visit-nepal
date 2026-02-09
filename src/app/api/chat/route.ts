import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    console.log("Chat API: Starting request");
    
    const session = await getServerSession(authOptions);
    console.log("Chat API: Session:", session?.user?.email);
    
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("Chat API: Failed to parse JSON body");
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }
    
    const { message } = body;
    console.log("Chat API: Message received:", message?.substring(0, 50));

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const prompt = `
You are a Nepal tourism assistant.
Answer briefly and clearly.

User: ${message}
Bot:
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      return Response.json({ error: `AI service error: ${response.status}` }, { status: 503 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    console.log("Chat API: Finding user:", session.user.email);
    
    // get user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    console.log("Chat API: User found:", user?.id);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Chat API: Creating chat record");

    await (prisma as any).chat.create({
      data: {
        userId: user.id,
        userMessage: message,
        botReply: reply,
      },
    });

    console.log("Chat API: Chat saved successfully");

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}
