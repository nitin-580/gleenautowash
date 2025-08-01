"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Search, Star, Droplets, Sparkles, Shield } from "lucide-react"
import { MobileNavigation } from "@/components/mobile-navigation"

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
  imageUrl:string
}

const localServices: Service[] = [
    {
        id: "1",
        name: "Basic Exterior Wash",
        description: [
          "High-pressure rinse",
          "Foam wash",
          "Manual scrubbing",
          "Spot-free drying",
        ],
        basePrice: 149,
        duration: 30,
        category: "basic",
        isActive: true,
        isPremium: false,
        isBestSeller: false,
        rating: 4.2,
        imageUrl: "/assets/services/image copy 2.png",
      },
      {
        id: "2",
        name: "Snow Foam Wash",
        description: [
          "Thick snow foam application",
          "Loosens dirt without scratching",
          "High-pressure rinse",
          "Microfiber wipe down",
        ],
        basePrice: 299,
        duration: 35,
        category: "standard",
        isActive: true,
        isPremium: false,
        isBestSeller: true,
        rating: 4.5,
        imageUrl: "/assets/services/image copy 3.png",
      },
      {
        id: "4",
        name: "Touchless Car Wash",
        description: [
          "Contactless high-pressure rinse",
          "Chemical spray to loosen dirt",
          "No scratches or swirl marks",
          "Quick and effective clean",
        ],
        basePrice: 249,
        duration: 20,
        category: "automated",
        isActive: true,
        isPremium: false,
        isBestSeller: false,
        rating: 4.1,
        imageUrl: "/images/services/touchless.jpg",
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
        imageUrl: "/images/services/ceramic-rinse.jpg",
      },
      {
        id: "7",
        name: "Underbody Wash",
        description: [
          "High-pressure undercarriage cleaning",
          "Removes mud, salt, and debris",
          "Ideal post-monsoon or road trips",
          "Rust prevention support",
        ],
        basePrice: 249,
        duration: 20,
        category: "add-on",
        isActive: true,
        isPremium: false,
        isBestSeller: false,
        rating: 4.3,
        imageUrl: "/assets/services/image copy 5.png",
      },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const router = useRouter()

  const handleBookNow = (service: Service) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedService", JSON.stringify(service))
      router.push("/booking/location")
    }
  }
  useEffect(() => {
    // Use local data instead of fetching
    setServices(localServices)
    setLoading(false)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "basic":
        return <Droplets className="h-5 w-5" />
      case "premium":
        return <Sparkles className="h-5 w-5" />
      case "detailing":
        return <Star className="h-5 w-5" />
      case "eco":
        return <Shield className="h-5 w-5" />
      default:
        return <Droplets className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "basic":
        return "bg-blue-100 text-blue-800"
      case "premium":
        return "bg-purple-100 text-purple-800"
      case "detailing":
        return "bg-yellow-100 text-yellow-800"
      case "full":
        return "bg-green-100 text-green-800"
      case "eco":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col pb-16">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">Our Services</h1>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <h2 className="mb-2 text-2xl font-bold">Professional Car Care</h2>
          <p className="text-blue-100">Choose from our range of premium car wash and detailing services</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="basic">Basic Wash</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="detailing">Detailing</SelectItem>
              <SelectItem value="full">Full Service</SelectItem>
              <SelectItem value="eco">Eco-Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <div className="relative h-32 w-full">
              <Image
  src={service.imageUrl}
  alt={service.name}
  fill
  className="object-cover"
/>

                <div className="absolute top-2 left-2 space-x-2 flex">
                  {service.isPremium && <Badge className="bg-purple-600 text-white">Premium</Badge>}
                  {service.isBestSeller && <Badge className="bg-yellow-500 text-black">Best Seller</Badge>}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={getCategoryColor(service.category)}>{service.category}</Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    {getCategoryIcon(service.category)}
                    <span className="ml-2">{service.name}</span>
                  </CardTitle>
                  <span className="text-lg font-bold text-blue-600">₹{service.basePrice}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <ul className="list-disc pl-5">
                  {service.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="flex justify-between pt-2 text-xs">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {service.duration} min
                  </span>
                  {service.rating && (
                    <span className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-500" />
                      {service.rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
              <Button
  className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
  onClick={() => handleBookNow(service)}
>
  Book Now
</Button>

              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
