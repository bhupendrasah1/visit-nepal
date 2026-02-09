"use client";

import { useState } from "react";

export default function TripPlanner() {
  const [budget, setBudget] = useState(20000);
  const [result, setResult] = useState<any[]>([]);

  async function plan() {
    try {
    const res = await fetch("/api/trip-planner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budget }),
    });
    if (!res.ok) {
      throw new Error("Failed to plan trip");
    }
    setResult(await res.json());
  } catch (error) {
    console.error("Failed to plan trip", error);
    alert("Failed to plan trip. Please try again later.");  
}
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Trip Planner</h1>

      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(+e.target.value)}
        className="border p-2 mt-4"
      />

      <button onClick={plan} className="block mt-4 bg-green-600 text-white px-4 py-2">
        Plan Trip
      </button>

      <ul className="mt-6">
        {result.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </main>
  );
}
