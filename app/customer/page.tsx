import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Clock, Car } from "lucide-react"

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Appointment</CardTitle>
            <CardDescription>Your upcoming car wash</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <CalendarDays className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Premium Wash</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  Today, 4:30 PM
                </div>
              </div>
            </div>
            <Button className="mt-4 w-full">Reschedule</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Loyalty Points</CardTitle>
            <CardDescription>Earn rewards with every wash</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progress to next reward</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="mt-4 text-center text-2xl font-bold">450 points</p>
            <Button variant="outline" className="mt-4 w-full">
              View Rewards
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Vehicles</CardTitle>
            <CardDescription>Manage your vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Car className="mr-2 h-5 w-5" />
                  <span>Tiago - Tata</span>
                </div>
                <Badge>Primary</Badge>
              </div>
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                <span>Swift - Maruti</span>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Add Vehicle
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Services</CardTitle>
          <CardDescription>Your wash history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, service: "Basic Wash", date: "May 28, 2023", status: "Completed", price: "₹299" },
              { id: 2, service: "Premium Wash", date: "May 15, 2023", status: "Completed", price: "₹499" },
              { id: 3, service: "Interior Detailing", date: "Apr 30, 2023", status: "Completed", price: "₹799" },
            ].map((booking) => (
              <div key={booking.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{booking.service}</p>
                  <p className="text-sm text-muted-foreground">{booking.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {booking.status}
                  </Badge>
                  <p className="font-medium">{booking.price}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full">
            View All History
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
