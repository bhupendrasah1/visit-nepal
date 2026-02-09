"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <div style={{ height: "256px", width: "100%" }} className="bg-gray-200 rounded animate-pulse flex items-center justify-center">Loading map...</div>
});

interface ClientMapProps {
  lat?: number | null;
  lng?: number | null;
  placeName?: string;
}

export default function ClientMap({ lat, lng, placeName }: ClientMapProps) {
  return <Map lat={lat} lng={lng} placeName={placeName} />;
}
