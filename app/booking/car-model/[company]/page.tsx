"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const carModels: Record<string, string[]> = {
  "maruti suzuki": ["Swift", "Baleno", "Ertiga", "WagonR", "Brezza"],
  hyundai: ["Creta", "i20", "Venue", "Verna", "Tucson"],
  "tata motors": ["Nexon", "Harrier", "Altroz", "Tiago", "Safari"],
  mahindra: ["Scorpio", "Thar", "XUV700", "Bolero", "Marazzo"],
  honda: ["City", "Amaze", "Jazz", "WR-V", "CR-V"],
  toyota: ["Fortuner", "Innova Crysta", "Urban Cruiser", "Glanza"],
  kia: ["Seltos", "Sonet", "Carnival", "EV6"],
  volkswagen: ["Polo", "Vento", "Tiguan", "Taigun"],
  renault: ["Kwid", "Duster", "Triber", "Kiger"],
  skoda: ["Octavia", "Rapid", "Kushaq", "Superb"],
  nissan: ["Magnite", "Kicks", "Almera", "Terrano"],
  "mg motor": ["Hector", "ZS EV", "Astor"],
  jeep: ["Compass", "Wrangler", "Grand Cherokee"],
  "mercedes-benz": ["C-Class", "E-Class", "GLA", "GLE"],
  bmw: ["3 Series", "5 Series", "X1", "X5"],
  audi: ["A3", "A4", "Q3", "Q7"],
};

export default function CarModelsPage() {
  const params = useParams();
  const router = useRouter();

  if (!params || typeof params.company !== "string") {
    return <div className="p-4 text-center">Invalid company route</div>;
  }

  const companySlug = params.company;
  const decodedCompany = decodeURIComponent(companySlug).replace(/-/g, " ").toLowerCase();
  const models = carModels[decodedCompany] || [];

  const [search, setSearch] = useState("");
  const filteredModels = models.filter((model) =>
    model.toLowerCase().includes(search.toLowerCase())
  );

  const handleModelSelect = (model: string) => {
    router.push(
      `/booking/user-auth?carCompany=${encodeURIComponent(decodedCompany)}&carModel=${encodeURIComponent(model)}`
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 capitalize text-center">{decodedCompany}</h2>

      <input
        type="text"
        placeholder="Search car model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      />

      <div className="grid grid-cols-2 gap-4">
        {filteredModels.length ? (
          filteredModels.map((model) => (
            <div
              key={model}
              onClick={() => handleModelSelect(model)}
              className="p-3 border rounded-lg text-center hover:bg-gray-100 cursor-pointer text-sm font-medium"
            >
              {model}
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 text-sm text-gray-500">No models found for {decodedCompany}</p>
        )}
      </div>
    </div>
  );
}
