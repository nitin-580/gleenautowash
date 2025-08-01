"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function BookingPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Book a Car Wash</h1>

      <Tabs defaultValue="service" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="service">Service</TabsTrigger>
          <TabsTrigger value="time">Time & Location</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
        </TabsList>

        <TabsContent value="service" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Select a Service</CardTitle>
              <CardDescription>Choose the type of wash you need</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="basic" className="space-y-4">
                {[
                  {
                    id: "basic",
                    name: "Basic Wash",
                    price: "₹299",
                    description: "Exterior wash, tire shine, and vacuum",
                  },
                  {
                    id: "premium",
                    name: "Premium Wash",
                    price: "₹499",
                    description: "Basic wash plus interior cleaning and wax",
                  },
                  {
                    id: "detailing",
                    name: "Interior Detailing",
                    price: "₹799",
                    description: "Deep interior cleaning and sanitization",
                  },
                  {
                    id: "full",
                    name: "Full Service",
                    price: "₹999",
                    description: "Complete interior and exterior detailing",
                  },
                  {
                    id: "eco",
                    name: "Eco Wash",
                    price: "₹399",
                    description: "Environmentally friendly waterless wash",
                  },
                ].map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={service.id} id={service.id} />
                    <Label htmlFor={service.id} className="flex flex-1 cursor-pointer justify-between">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <p className="font-medium">{service.price}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Continue to Time & Location</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Time & Location</CardTitle>
              <CardDescription>Choose when and where you want your car washed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    placeholder="Enter your address"
                    className="flex-1"
                    defaultValue="123 Main Street, Lucknow"
                  />
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Continue to Vehicle</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Vehicle</CardTitle>
              <CardDescription>Choose which vehicle needs washing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="tiago" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tiago" id="tiago" />
                  <Label htmlFor="tiago" className="flex flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Tiago - Tata</p>
                      <p className="text-sm text-muted-foreground">Hatchback • White</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="swift" id="swift" />
                  <Label htmlFor="swift" className="flex flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Swift - Maruti</p>
                      <p className="text-sm text-muted-foreground">Hatchback • Red</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <Button variant="outline" className="w-full">
                Add New Vehicle
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-medium">Booking Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Premium Wash</span>
                    <span>₹499</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span>{date ? format(date, "PPP") : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time</span>
                    <span>4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle</span>
                    <span>Tiago - Tata</span>
                  </div>
                  <div className="mt-2 border-t pt-2 font-medium">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>₹499</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">Confirm Booking</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
