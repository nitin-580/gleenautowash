"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Service {
  id: string;
  name: string;
  description?: string[];
  basePrice: number;
  duration?: number;
  category?: string;
  isActive?: boolean;
  isPremium?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  image?: string;
}

const recommendedAddOn = {
  id: 3,
  name: "Tire Polish Add-on",
  price: 199,
};

export default function CartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams?.get("name") || "";
  const phone = searchParams?.get("phone") || "";
  const address = searchParams?.get("address") || "";
  const time = searchParams?.get("time") || "";
  const date = searchParams?.get("date") || "";

  const [service, setService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addOnChecked, setAddOnChecked] = useState(false);

  useEffect(() => {
    if (searchParams) {
      const serviceStr = searchParams.get("service");
      if (serviceStr) {
        try {
          const parsedService = JSON.parse(serviceStr);
          setService(parsedService);
        } catch {
          setService(null);
        }
      }
    }
  }, [searchParams]);

  const updateQuantity = (increment: boolean) => {
    setQuantity((q) => Math.max(1, q + (increment ? 1 : -1)));
  };

  const subtotal = service ? service.basePrice * quantity : 0;
  const addOnTotal = addOnChecked ? recommendedAddOn.price : 0;
  const serviceFee = 0;
  const tax = (subtotal + addOnTotal + serviceFee) * 0.18;
  const total = subtotal + addOnTotal + serviceFee + tax;

  const handleBooking = async () => {
    if (!service || !name || !phone || !address) {
      alert("Missing required booking details.");
      return;
    }
  
    // Parse the address for address1, address2, city, pincode (you can improve parsing based on your address format)
    // Here I assume the user provides address as "address1, address2, city, pincode" (comma-separated)
    const parts = address.split(",").map((part) => part.trim());
  
    const address1 = parts[0] || "";
    const address2 = parts[1] || "";
    const city = parts.length > 2 ? parts[2] : "";
    const pincode = parts.length > 3 ? parts[3] : "";
  
    const payload = {
      name,
      phone,
      address1,
      address2,
      city,
      pincode,
      service: service.name,
      basePrice: service.basePrice,
      quantity,
      addOnSelected: addOnChecked,
      addOnPrice: addOnChecked ? recommendedAddOn.price : 0,
      serviceFee: 0,
      tax: tax,
      total: total,
      date,
      time,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
  
    try {
      await addDoc(collection(db, "bookings"), payload);
      router.push("/booking/confirmation");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to connect. Please try again.");
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="border p-4 rounded-md bg-gray-50 space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Name:</span>
          <span>{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Phone:</span>
          <span>{phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Address:</span>
          <span className="max-w-xs break-words">{address}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Preferred Date:</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Preferred Time:</span>
          <span>{time}</span>
        </div>
        <button
          onClick={() => router.push(`/booking/user-auth?address=${encodeURIComponent(address)}`)}
          className="text-yellow-500 underline text-sm font-semibold mt-2"
        >
          Change Details
        </button>
      </div>

      <h2 className="text-xl font-bold">Your Cart</h2>

      {service ? (
        <div className="flex items-center gap-4 border p-4 rounded-md">
          {service.image && (
            <Image
              src={service.image}
              alt={service.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-gray-700">
              {service.description?.length ? service.description.join(", ") : ""}
            </p>
            <div className="text-lg font-bold text-green-600 mt-1">
              ₹{service.basePrice} x {quantity}
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => updateQuantity(false)}>
                -
              </Button>
              <span>{quantity}</span>
              <Button size="sm" onClick={() => updateQuantity(true)}>
                +
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No service selected.</p>
      )}

      <div className="flex items-center gap-2">
        <Checkbox
          id="addon"
          checked={addOnChecked}
          onCheckedChange={() => setAddOnChecked(!addOnChecked)}
        />
        <label htmlFor="addon" className="text-sm cursor-pointer">
          Add <span className="font-semibold">{recommendedAddOn.name}</span> for ₹
          {recommendedAddOn.price}
        </label>
      </div>

      <div className="border-t pt-4 text-sm">
        <div className="flex justify-between mb-1">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Service Fee</span>
          <span>₹{serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Tax (18%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        {addOnChecked && (
          <div className="flex justify-between mb-1">
            <span>Add-on</span>
            <span>₹{addOnTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg mt-2">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <Button
          className="mt-4 w-full bg-yellow-400 text-black hover:bg-yellow-500"
          onClick={handleBooking}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
