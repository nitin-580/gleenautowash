"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Clock, Star, ChevronDown, ChevronUp } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string[]
  basePrice: number
  duration: number
  category: string
  isActive: boolean
  isPremium?: boolean
  isBestSeller?: boolean
  rating?: number
  imageUrl: string
}

const popularServices: Service[] = [
  {
    id: "2",
    name: "Snow Foam Wash",
    description: [
      "Thick snow foam application",
      "Loosens dirt without scratching",
      "High-pressure rinse",
      "Microfiber wipe down",
    ],
    basePrice: 149,
    duration: 35,
    category: "standard",
    isActive: true,
    isBestSeller: true,
    rating: 4.5,
    imageUrl: "/assets/services/image copy 3.png",
  },
  {
    id: "5",
    name: "Exterior Wash + Wax",
    description: [
      "Foam wash and rinse",
      "Hand-applied or spray wax",
      "Buffing for enhanced shine",
      "Paint protection up to 1 week",
    ],
    basePrice: 349,
    duration: 45,
    category: "premium",
    isActive: true,
    isPremium: true,
    isBestSeller: true,
    rating: 4.7,
    imageUrl: "/assets/services/image copy 4.png",
  },
  {
    id: "6",
    name: "Ceramic Rinse Coat",
    description: [
      "Quick ceramic spray after wash",
      "Improves water-beading",
      "Short-term paint protection",
      "Smooth & shiny finish",
    ],
    basePrice: 199,
    duration: 15,
    category: "add-on",
    isActive: true,
    isPremium: true,
    isBestSeller: false,
    rating: 4.4,
    imageUrl: "/assets/services/image copy 12.png",
  },
]

export default function PopularServicesSection() {
  const router = useRouter()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleBookNow = (service: Service) => {
    sessionStorage.setItem("selectedService", JSON.stringify(service))
    router.push("/booking/location")
  }

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <section className="">
      <div className="">
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {popularServices.map((service) => {
            const isExpanded = expandedId === service.id
            return (
              <div
                key={service.id}
                className="min-w-[250px] flex-shrink-0 rounded-xl border bg-white shadow-md"
              >
                <div className="h-36 w-full relative overflow-hidden rounded-t-xl">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-md font-semibold truncate">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Starting from ₹{service.basePrice}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration} min
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {service.rating?.toFixed(1)}
                    </span>
                  </div>

                  {isExpanded && (
                    <ul className="text-xs text-gray-600 list-disc pl-4 mb-2">
                      {service.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                      onClick={() => handleBookNow(service)}
                    >
                      Book Now
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleExpand(service.id)}
                      className="px-2"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
