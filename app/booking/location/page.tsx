"use client";
import LocationPicker from "@/components/LocationPicker"; // Adjust path if in a different route

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Address</h1>
      <LocationPicker />
    </div>
  );
}
