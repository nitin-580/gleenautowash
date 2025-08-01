"use client"
import { useState, useEffect } from "react";
import Link from 'next/link'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { InfoCard } from "@/components/info-card"
import PopularServicesSection from "./booking/popularservices/page";
import ReviewCard from "@/components/ReviewCard"
import { Avatar } from "@radix-ui/react-avatar";


const images = [
  "/Herosec1.jpg",
  "/Herosec2.png",
  "/Herosec3.png",
];

const reviews = [
  {
    id: "r1",
    name: "Priya Sharma",
    avatarUrl: "/assets/icons/icon1.png",
    rating: 5,
    comment: "Excellent service! My car looked brand new after the snow foam wash.",
    serviceName: "Snow Foam Wash",
    date: "June 7, 2025",
  },
  {
    id: "r2",
    name: "Amit Verma",
    avatarUrl:"/assets/icons/icon1.png",
    rating: 4,
    comment: "The underbody wash was thorough and fast. Will come again!",
    serviceName: "Underbody Wash",
    date: "June 5, 2025",
  },
  {
    id: "r3",
    name: "Sneha Kulkarni",
    avatarUrl: "/assets/icons/icon1.png",
    rating: 5,
    comment: "Loved the wax finish! Super shiny and smooth surface.",
    serviceName: "Exterior Wash + Wax",
    date: "June 3, 2025",
  },
]
export default function Home() {
  const [current, setCurrent] = useState(0);
  const [userAddress, setUserAddress] = useState("Detecting...");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            className="h-[200px] w-full"
          >
            {["/Herosec1.png", "/Herosec3.png", "/Herosec2.png"].map((src, idx) => (
              <SwiperSlide key={idx}>
                <img src={src} alt={`slide-${idx}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="py-8">
          <div className="container px-4">
            <h2 className="mb-6 text-xl font-bold">Doorstep Autocare Services</h2>
            <div className="grid grid-cols-3 gap-4 rounded-lg">
              <Link href="/services/carwash">
                <ServiceCard title="Car Wash" icon="/assets/icons/icon1.png" />
              </Link>
              <Link href="/services/deepclean">
                <ServiceCard title="Deep Clean" icon="/assets/icons/icon2.png" />
              </Link>
              <Link href="/services/shine-coat">
                <ServiceCard title="Shine/Coat" icon="/assets/icons/icon3.png" />
              </Link>
              <Link href="/services/luxury-car-care">
                <ServiceCard title="Luxury Car Care" icon="/assets/icons/icon4.png" />
              </Link>
              <Link href="/services/special-car-care">
                <ServiceCard title="Special Car Care" icon="/assets/icons/icon5.png" />
              </Link>
              <Link href="/services/bike-moped">
                <ServiceCard title="Bike & Moped" icon="/assets/icons/icon6.png" />
              </Link>
            </div>
          </div>
        </section>
        <section className="">
          <div>
            <img src="/assets/banner/Banner1.png" alt="" />
          </div>
        </section>

        <section className="py-8 mb-2">
          <div className="container px-4">
            <h2 className="mb-4 text-xl font-bold">Popular Services</h2>
            <PopularServicesSection/>
          </div>
        </section>

        <section className="mb-5 p-3">
          <div>
            <img src="/Herosec4.png" alt="" />
          </div>
        </section>
        <h2 className="mb-4 text-xl font-bold px-4">Why Gleen?</h2>
        <section className="mb-5">
        <div className="overflow-x-auto px-2">
        <div className="flex space-x-4 pb-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
        </section>
        <section className="bg-gradient-to-r from-blue-500 to-blue-200 py-4">
          <div className="container flex items-center justify-between px-4">
            <div>
              <h3 className="text-lg font-bold text-white">GLEEN VS</h3>
              <p className="text-sm text-white/80">Washing Centre • Daily Washer</p>
            </div>
            <Button variant="secondary" size="sm" className="border">
              Know More
            </Button>
          </div>
        </section>

        <section className="py-8 mb-10">
          <div className="container px-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                title="Why Car Care is Important?"
                description="Regular car care extends your vehicle's life and maintains its value. Learn about essential maintenance practices."
              />
              <InfoCard
                title="Why Professional Car Wash is Important?"
                description="Professional washing uses specialized equipment and eco-friendly products that protect your car's paint and finish."
              />
            </div>
          </div>
        </section>
      </main>

    {/* <MobileNavigation /> */}
    </div>
  );
}
