"use client";

import { useMemo, useState } from "react";

export interface FestivalEvent {
  id: string;
  name: string;
  season: string;
  description: string;
  imageUrl: string;
}

interface FestivalEventsProps {
  events: FestivalEvent[];
}

export default function FestivalEvents({ events }: FestivalEventsProps) {
  const [activeId, setActiveId] = useState<string>(events[0]?.id ?? "");

  const activeEvent = useMemo(() => events.find((event) => event.id === activeId), [events, activeId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1.6fr]">
      <div className="space-y-3">
        {events.map((event) => {
          const isActive = event.id === activeId;
          return (
            <button
              key={event.id}
              type="button"
              onClick={() => setActiveId(event.id)}
              className={`w-full text-left border rounded-xl px-4 py-3 transition shadow-sm ${
                isActive
                  ? "border-red-400 bg-red-50 shadow"
                  : "border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/50"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.season}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isActive ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                  View
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        {activeEvent ? (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-gray-100">
              <img
                src={activeEvent.imageUrl}
                alt={activeEvent.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{activeEvent.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{activeEvent.season}</p>
            </div>
            <p className="text-gray-700 leading-relaxed">{activeEvent.description}</p>
          </div>
        ) : (
          <p className="text-gray-500">Select a festival to see details.</p>
        )}
      </div>
    </div>
  );
}
