"use client";

import { useState } from "react";
import Image from "next/image";

const carCompanies = [
  {
    name: "Maruti Suzuki",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/Maruti-Suzuki-logo.png",
  },
  {
    name: "Hyundai",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Hyundai-logo.png",
  },
  {
    name: "Tata Motors",
    logo: "https://1000logos.net/wp-content/uploads/2020/04/Tata-Logo-768x432.png",
  },
  {
    name: "Mahindra",
    logo: "https://1000logos.net/wp-content/uploads/2020/11/Mahindra-logo.png",
  },
  {
    name: "Honda",
    logo: "https://1000logos.net/wp-content/uploads/2018/02/Honda-logo.png",
  },
  {
    name: "Toyota",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Toyota-logo.png",
  },
  {
    name: "Kia",
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Kia-logo.png",
  },
  {
    name: "Volkswagen",
    logo: "https://1000logos.net/wp-content/uploads/2017/03/Volkswagen-Logo-768x432.png",
  },
  {
    name: "Renault",
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Renault-logo.png",
  },
  {
    name: "Skoda",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/Skoda-logo.png",
  },
  {
    name: "Nissan",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Nissan-logo.png",
  },
  {
    name: "MG Motor",
    logo: "https://1000logos.net/wp-content/uploads/2020/11/MG-logo.png",
  },
  {
    name: "Jeep",
    logo: "https://1000logos.net/wp-content/uploads/2017/03/Jeep-Logo-768x432.png",
  },
  {
    name: "Mercedes-Benz",
    logo: "https://1000logos.net/wp-content/uploads/2018/03/Mercedes-Benz-logo.png",
  },
  {
    name: "BMW",
    logo: "https://1000logos.net/wp-content/uploads/2018/02/BMW-logo.png",
  },
  {
    name: "Audi",
    logo: "https://1000logos.net/wp-content/uploads/2018/02/Audi-logo.png",
  },
];

export default function CarCompanySelector() {
  const [search, setSearch] = useState("");

  const filteredCompanies = carCompanies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

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
