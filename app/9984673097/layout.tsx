import type React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">GLEEN Admin</h1>
          <nav>
            <Tabs defaultValue="bookings">
              <TabsList>
                <Link href="/admin/partners">
                  <TabsTrigger value="partners">Partners</TabsTrigger>
                </Link>
                <Link href="/admin/customers">
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </Link>
                <Link href="/admin">
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                </Link>
                <Link href="/admin/analytics">
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </Link>
              </TabsList>
            </Tabs>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-muted/40 py-6">
        <div className="container">{children}</div>
      </main>
    </div>
  )
}
