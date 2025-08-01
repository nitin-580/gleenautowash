"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Send, FileText } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city?: string;
  pincode?: string;
  service: string;
  date: string;
  time: string;
  total: string;
  status: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const bookingsData: Booking[] = [];
        querySnapshot.forEach((doc) => {
          bookingsData.push({ id: doc.id, ...doc.data() } as Booking);
        });

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  function handleGenerateInvoice(booking: Booking) {
    const invoiceWindow = window.open("", "Invoice", "width=800,height=600");
    if (!invoiceWindow) return;

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${booking.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 2rem; }
            h1 { margin-bottom: 1rem; }
            p { margin: 0.5rem 0; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <p><strong>Booking ID:</strong> ${booking.id}</p>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Address:</strong> ${booking.address1} ${booking.address2 || ""}, ${booking.city || ""} - ${booking.pincode || ""}</p>
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Date & Time:</strong> ${booking.date}, ${booking.time}</p>
          <p><strong>Status:</strong> ${booking.status}</p>
          <p><strong>Price:</strong> ₹${booking.total}</p>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>Manage and monitor all car wash bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bookings..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              {loading ? (
                <p className="p-4 text-center">Loading bookings...</p>
              ) : bookings.length === 0 ? (
                <p className="p-4 text-center">No bookings found.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Address</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date & Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="px-4 py-3 text-sm">{booking.id}</td>
                        <td className="px-4 py-3 text-sm">{booking.name}</td>
                        <td className="px-4 py-3 text-sm">{booking.phone}</td>
                        <td className="px-4 py-3 text-sm">
                          {booking.address1} {booking.address2 || ""}, {booking.city || ""} - {booking.pincode || ""}
                        </td>
                        <td className="px-4 py-3 text-sm">{booking.service}</td>
                        <td className="px-4 py-3 text-sm">{booking.date}, {booking.time}</td>
                        <td className="px-4 py-3 text-sm">₹{booking.total}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant={booking.status?.toLowerCase() === "completed" ? "outline" : "default"}>{booking.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" onClick={() => handleGenerateInvoice(booking)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="flex items-center justify-between border-t px-4 py-2">
              <p className="text-sm text-muted-foreground">Showing {bookings.length} bookings</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
