"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const carCompanies = [
  {
    name: "Maruti-Suzuki",
    logo: "/assets/logos/image.png",
  },
  {
    name: "Hyundai",
    logo: "/assets/logos/image copy.png",
  },
  {
    name: "Tata-Motors",
    logo: "https://1000logos.net/wp-content/uploads/2020/04/Tata-Logo-768x432.png",
  },
  {
    name: "Mahindra",
    logo: "/assets/logos/image copy 2.png",
  },
  {
    name: "Honda",
    logo: "/assets/logos/image copy 3.png",
  },
  {
    name: "Toyota",
    logo: "/assets/logos/image copy 6.png",
  },
  {
    name: "Kia",
    logo: "/assets/logos/image copy 4.png",
  },
  {
    name: "Volkswagen",
    logo: "/assets/logos/image copy 5.png",
  },
  {
    name: "Renault",
    logo: "/assets/logos/image copy 7.png",
  },
  {
    name: "Skoda",
    logo: "/assets/logos/image copy 8.png",
  },
  {
    name: "Nissan",
    logo: "/assets/logos/image copy 9.png",
  },
  {
    name: "MG Motor",
    logo: "/assets/logos/image copy 10.png",
  },
  {
    name: "Jeep",
    logo: "/assets/logos/image copy 11.png",
  },
  {
    name: "Mercedes-Benz",
    logo: "/assets/logos/image copy 12.png",
  },
  {
    name: "BMW",
    logo: "/assets/logos/image copy 13.png",
  },
  {
    name: "Audi",
    logo: "/assets/logos/image copy 14.png",
  },
];

export default function CarCompanySelector() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCompanies = carCompanies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (companyName: string) => {
    // Convert to slug, replacing spaces with dashes, lowercase
    const companySlug = encodeURIComponent(companyName.toLowerCase().replace(/\s+/g, "-"));
    // Navigate to car-model page with query param
    router.push(`/booking/car-model?company=${companySlug}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Select Your Car Company</h2>

      <input
        type="text"
        placeholder="Search car brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div
            key={company.name}
            onClick={() => handleClick(company.name)}
            className="flex items-center gap-2 p-2 border rounded-lg hover:shadow-md cursor-pointer transition"
          >
            <Image
              src={company.logo}
              alt={company.name}
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-sm font-medium">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
