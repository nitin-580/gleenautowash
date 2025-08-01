"use client"

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
        id: "21",
        name: "Luxury Quick Detail Wash",
        description: [
          "Hand wash with premium shampoo",
          "Quick spot cleaning",
          "Gentle microfiber drying",
          "Paint-safe rinse",
        ],
        basePrice: 999,
        duration: 25,
        category: "basic",
        isActive: true,
        isPremium: true,
        isBestSeller: false,
        rating: 4.7,
        imageUrl: "/images/services/luxury-quick-detail.jpg",
      },
      {
        id: "16",
        name: "Luxury Gentle Wash",
        description: [
          "Soft-touch hand wash with pH-neutral shampoo",
          "Non-abrasive microfiber towels",
          "Rinse with purified water to avoid water spots",
          "Gentle drying to protect delicate paint",
        ],
        basePrice: 1999,
        duration: 45,
        category: "premium",
        isActive: true,
        isPremium: true,
        isBestSeller: false,
        rating: 4.9,
        imageUrl: "/images/services/luxury-gentle-wash.jpg",
      },
      {
        id: "22",
        name: "Luxury Exterior Clay Bar Treatment",
        description: [
          "Clay bar removal of bonded contaminants",
          "Prepares paint for waxing or coating",
          "Smooth and clean surface finish",
          "Protects paint integrity",
        ],
        basePrice: 2499,
        duration: 60,
        category: "detailing",
        isActive: true,
        isPremium: true,
        isBestSeller: false,
        rating: 4.8,
        imageUrl: "/images/services/luxury-clay-bar.jpg",
      },
      {
        id: "19",
        name: "Luxury Wheel & Rim Detailing",
        description: [
          "Gentle but thorough wheel cleaning",
          "Removal of brake dust and grime",
          "Application of protective wheel sealant",
          "Polish for a mirror-like shine",
        ],
        basePrice: 1499,
        duration: 40,
        category: "add-on",
        isActive: true,
        isPremium: true,
        isBestSeller: false,
        rating: 4.8,
        imageUrl: "/images/services/luxury-wheel-detailing.jpg",
      },
      {
        id: "17",
        name: "Luxury Wax & Sealant",
        description: [
          "Hand-applied premium wax with natural carnauba",
          "Synthetic sealant for long-lasting protection",
          "Enhances paint depth and gloss",
          "UV protection and water repellency",
        ],
        basePrice: 3999,
        duration: 75,
        category: "premium",
        isActive: true,
        isPremium: true,
        isBestSeller: true,
        rating: 5.0,
        imageUrl: "/images/services/luxury-wax-sealant.jpg",
      },
      {
        id: "23",
        name: "Luxury Paint Protection Film (PPF) Prep",
        description: [
          "Surface cleaning and polishing",
          "Paint defect correction before PPF",
          "Ensures perfect adhesion",
          "Prepares for PPF application",
        ],
        basePrice: 5999,
        duration: 90,
        category: "detailing",
        isActive: true,
        isPremium: true,
        isBestSeller: false,
        rating: 4.9,
        imageUrl: "/images/services/luxury-ppf-prep.jpg",
      },
      {
        id: "20",
        name: "Luxury Paint Correction",
        description: [
          "Multi-stage polishing to remove swirl marks and scratches",
          "Restores factory paint finish",
          "Prepares surface for ceramic coating or wax",
          "Professional-grade detailing for flawless finish",
        ],
        basePrice: 7999,
        duration: 120,
        category: "detailing",
        isActive: true,
        isPremium: true,
        isBestSeller: true,
        rating: 4.9,
        imageUrl: "/images/services/luxury-paint-correction.jpg",
      },
      {
        id: "18",
        name: "Luxury Ceramic Coating Pro",
        description: [
          "Advanced multi-layer ceramic coating",
          "Protects against scratches, chemicals, and UV rays",
          "Hydrophobic finish with extreme gloss",
          "12+ months durability with professional maintenance",
        ],
        basePrice: 14999,
        duration: 180,
        category: "premium",
        isActive: true,
        isPremium: true,
        isBestSeller: true,
        rating: 5.0,
        imageUrl: "/images/services/luxury-ceramic-coating-pro.jpg",
      },
      {
        id: "24",
        name: "Luxury Complete Exterior Concierge",
        description: [
          "Full exterior wash & gentle detailing",
          "Paint correction & ceramic coating prep",
          "Luxury wax & sealant application",
          "Wheel & rim deep cleaning and protection",
          "Final inspection and finish polish",
        ],
        basePrice: 19999,
        duration: 240,
        category: "premium",
        isActive: true,
        isPremium: true,
        isBestSeller: false,
        rating: 5.0,
        imageUrl: "/images/services/luxury-complete-concierge.jpg",
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
