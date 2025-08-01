import { ArrowRight } from "lucide-react"

interface InfoCardProps {
  title: string
  description: string
}

export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-4 text-sm text-gray-500">{description}</p>
      <div className="flex items-center text-sm font-medium text-blue-600">
        Read More
        <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </div>
  )
}
