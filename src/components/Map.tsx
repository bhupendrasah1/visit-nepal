"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

// Fix for default marker icons in Leaflet with webpack
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  lat?: number | null;
  lng?: number | null;
  placeName?: string;
}

export default function Map({ lat, lng, placeName }: MapProps) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    lat != null && lng != null ? { lat, lng } : null
  );
  const [loading, setLoading] = useState(!coords && !!placeName);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (coords || !placeName) return;

    const geocode = async () => {
      try {
        const query = encodeURIComponent(`${placeName}, Nepal`);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=np`,
          {
            headers: {
              "User-Agent": "VisitNepal/1.0",
            },
          }
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        } else {
          setError("Location not found");
        }
      } catch (err) {
        setError("Failed to load map");
      } finally {
        setLoading(false);
      }
    };

    geocode();
  }, [coords, placeName]);

  if (loading) {
    return (
      <div
        style={{ height: "256px", width: "100%" }}
        className="bg-gray-200 rounded animate-pulse flex items-center justify-center"
      >
        Loading map...
      </div>
    );
  }

  if (error || !coords) {
    return (
      <div
        style={{ height: "256px", width: "100%" }}
        className="bg-gray-100 rounded flex items-center justify-center text-gray-500"
      >
        {error || "Unable to load map"}
      </div>
    );
  }

  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={10}
      style={{ height: "256px", width: "100%" }}
      className="rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coords.lat, coords.lng]} icon={icon} />
    </MapContainer>
  );
}
