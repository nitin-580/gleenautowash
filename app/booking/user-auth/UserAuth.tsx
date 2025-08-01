"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  name: string;
  description: string[];
  basePrice: number;
  duration: number;
  category: string;
  isActive: boolean;
  isPremium?: boolean;
  isBestSeller?: boolean;
  rating?: number;
}

export default function UserAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    phoneFormat: false,
    address: false,
    time: false,
    date: false,
  });

  useEffect(() => {
    if (searchParams) {
      const addr = searchParams.get("address") || "";
      setAddress(addr);

      const serviceStr = searchParams.get("service");
      if (serviceStr) {
        try {
          setSelectedService(JSON.parse(serviceStr));
        } catch {
          setSelectedService(null);
        }
      }
    }
  }, [searchParams]);

  const validateFields = () => {
    const phoneOnlyDigits = /^\d{10}$/.test(phone);
    const newErrors = {
      name: name.trim() === "",
      phone: phone.trim() === "",
      phoneFormat: !phoneOnlyDigits,
      address: address.trim() === "",
      time: time.trim() === "",
      date: date.trim() === "",
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleProceed = () => {
    if (!validateFields()) return;

    const params = new URLSearchParams({
      name,
      phone,
      address,
      time,
      date,
    });

    if (selectedService) {
      params.set("service", JSON.stringify(selectedService));
    }

    router.push(`/booking/cart?${params.toString()}`);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Enter Your Details</h1>

      {selectedService && (
        <div className="mb-4 p-3 bg-gray-100 rounded-md flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">{selectedService.name}</h3>
            <p className="text-sm text-gray-700">
              ₹{selectedService.basePrice} • {selectedService.duration} min
            </p>
          </div>
          <button
            onClick={() => router.push("/services")}
            className="text-yellow-500 underline text-sm font-semibold ml-4"
          >
            Change
          </button>
        </div>
      )}

      {/* Name Input */}
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-2 border rounded-md ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">Name is required</p>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // only digits
          maxLength={10}
          className={`w-full p-2 border rounded-md ${
            errors.phone || errors.phoneFormat ? "border-red-500" : ""
          }`}
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">Phone number is required</p>
        )}
        {!errors.phone && errors.phoneFormat && (
          <p className="text-sm text-red-500 mt-1">
            Phone number must be exactly 10 digits
          </p>
        )}
      </div>

      {/* Date Input */}
      <div>
        <label className="block text-sm font-semibold">Preferred Date for Car Wash</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full p-2 border rounded-md ${
            errors.date ? "border-red-500" : ""
          }`}
        />
        {errors.date && (
          <p className="text-sm text-red-500 mt-1">Date is required</p>
        )}
      </div>

      {/* Time Input */}
      <div>
        <label className="block text-sm font-semibold mt-4">Preferred Time for Car Wash</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={`w-full p-2 border rounded-md ${
            errors.time ? "border-red-500" : ""
          }`}
        />
        {errors.time && (
          <p className="text-sm text-red-500 mt-1">Time is required</p>
        )}
      </div>

      {/* Address Display */}
      {address && (
        <div>
          <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center border">
            <div className="text-gray-700">{address}</div>
            <button
              onClick={() => router.push("/booking/location")}
              className="text-yellow-500 underline text-sm font-semibold ml-4"
            >
              Change
            </button>
          </div>
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">Address is required</p>
          )}
        </div>
      )}

      {/* Proceed Button */}
      <button
        onClick={handleProceed}
        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md mt-4 hover:bg-yellow-500 transition"
      >
        Continue to Cart
      </button>
    </div>
  );
}
