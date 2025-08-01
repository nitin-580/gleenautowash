"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, ChevronDown, Car } from "lucide-react";

export default function Header() {
  const searchParams = useSearchParams();

  const [userAddress, setUserAddress] = useState("Detecting...");
  const [carCompany, setCarCompany] = useState<string | null>(null);
  const [carModel, setCarModel] = useState<string | null>(null);

  useEffect(() => {
    // Geolocation fetching remains same
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          try {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            );
            const data = await res.json();
            if (data.status === "OK") {
              const components = data.results[0].address_components;
              const city = components.find((c: any) =>
                c.types.includes("locality")
              )?.long_name;
              const pincode = components.find((c: any) =>
                c.types.includes("postal_code")
              )?.long_name;
              setUserAddress(`${city || ""}, ${pincode || ""}`);
            } else {
              setUserAddress("Location not found");
            }
          } catch {
            setUserAddress("Error fetching location");
          }
        },
        () => {
          setUserAddress("Location access denied");
        }
      );
    }
  }, []);

  useEffect(() => {
    // Read carCompany and carModel from URL params, if any
    if (searchParams) {
      setCarCompany(searchParams.get("carCompany"));
      setCarModel(searchParams.get("carModel"));
    }
  }, [searchParams]);

  // Display combined string if both exist, else default
  const displayCar = carModel && carCompany ? `${carModel} - ${carCompany}` : "Tiago - Tata";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/Untitled (79).png"
              alt="Gleen Logo"
              className="h-24 mt-3 w-32"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full max-w-md mx-auto bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none bg-transparent text-sm text-gray-700"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center text-sm font-medium">
            <MapPin className="h-4 w-4" />
            {userAddress}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
