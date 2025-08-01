import Image from "next/image";
import {
  Car,
  SprayCanIcon as Spray,
  Sparkles,
  Star,
  Settings,
  Bike,
  type LucideIcon
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  icon: string; // Can be Lucide name or image path
}

export function ServiceCard({ title, icon }: ServiceCardProps) {
  const isImage = icon.startsWith("/");

  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "car":
        return Car;
      case "spray":
        return Spray;
      case "sparkles":
        return Sparkles;
      case "star":
        return Star;
      case "settings":
        return Settings;
      case "bike":
        return Bike;
      default:
        return Car;
    }
  };

  const Icon = getIcon();

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 border">
      <div className="mb-2 rounded-full">
        {isImage ? (
          <Image src={icon} alt={title} width={880} height={70} />
        ) : (
          <Icon className="h-6 w-6 text-yellow-600" />
        )}
      </div>
      <span className="text-center text-xs font-medium">{title}</span>
    </div>
  );
}
