"use client"

import Image from "next/image"
import { Star } from "lucide-react"

interface Review {
  id: string
  name: string
  avatarUrl?: string
  rating: number
  comment: string
  serviceName: string
  date: string
}

export default function ReviewCard({ review }: { review: Review }) {
  const stars = Array(5)
    .fill(null)
    .map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
        fill={i < review.rating ? "#facc15" : "none"}
      />
    ))

  return (
    <div className="min-w-[300px] max-w-sm rounded-xl border bg-white p-4 shadow-sm mr-4">
      <div className="flex items-center space-x-3 mb-2">
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={review.avatarUrl || "/default-avatar.png"}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{review.name}</p>
          <p className="text-xs text-gray-400">{review.date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1 mb-1">{stars}</div>
      <p className="text-xs text-gray-500 mb-2">
        Reviewed: <span className="font-medium">{review.serviceName}</span>
      </p>
      <p className="text-sm text-gray-700">{review.comment}</p>
    </div>
  )
}
