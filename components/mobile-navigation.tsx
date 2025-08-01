import Link from "next/link"
import { Home, ClipboardList, Grid, User } from "lucide-react"

export function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white">
      <div className="flex h-16 items-center justify-around">
        <Link href="/" className="flex flex-1 flex-col items-center justify-center">
          <Home className="h-5 w-5" />
          <span className="mt-1 text-xs">Home</span>
        </Link>
        <Link href="/orders" className="flex flex-1 flex-col items-center justify-center">
          <ClipboardList className="h-5 w-5" />
          <span className="mt-1 text-xs">My Orders</span>
        </Link>
        <Link href="/services" className="flex flex-1 flex-col items-center justify-center">
          <Grid className="h-5 w-5" />
          <span className="mt-1 text-xs">Services</span>
        </Link>
        <Link href="/profile" className="flex flex-1 flex-col items-center justify-center">
          <User className="h-5 w-5" />
          <span className="mt-1 text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  )
}
