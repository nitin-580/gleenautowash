"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BookingConfirmation() {
  const router = useRouter();

  useEffect(() => {
    // Optional: auto-redirect after few seconds
    // setTimeout(() => router.push("/"), 8000);
  }, [router]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
      <p className="text-lg mb-6">
        Thank you for booking with us. Your request has been received and is currently <strong>Pending</strong>.
      </p>
      <p className="mb-6">
        We will contact you soon with the confirmation details.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md"
      >
        Back to Home
      </button>
      <div className="flex flex-col items-center space-y-4 mt-6">
  <a
    href="https://wa.me/918320492885?text=Hey%20I%20have%20opted%20for%20your%20service"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md"
  >
    Confirm on WhatsApp
  </a>
</div>

    </div>
  );
}
