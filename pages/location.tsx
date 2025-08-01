import LocationPicker from "@/components/LocationPicker";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pick Your Location</h1>
      <LocationPicker />
    </main>
  );
}
