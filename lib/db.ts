// Database schema and types
export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: "customer" | "partner" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Customer extends User {
  role: "customer"
  loyaltyPoints: number
  addresses: Address[]
  vehicles: Vehicle[]
}

export interface Partner extends User {
  role: "partner"
  businessName: string
  isAvailable: boolean
  rating: number
  totalEarnings: number
  servicesOffered: string[]
}

export interface Address {
  id: string
  userId: string
  street: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface Vehicle {
  id: string
  userId: string
  make: string
  model: string
  color: string
  type: "hatchback" | "sedan" | "suv" | "bike"
  registrationNumber: string
  isDefault: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  duration: number // in minutes
  category: "basic" | "premium" | "detailing" | "full" | "eco"
  isActive: boolean
}

export interface Booking {
  id: string
  customerId: string
  partnerId?: string
  serviceId: string
  vehicleId: string
  addressId: string
  scheduledDate: Date
  scheduledTime: string
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  totalAmount: number
  paymentStatus: "pending" | "paid" | "refunded"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  bookingId: string
  customerId: string
  partnerId: string
  rating: number
  comment: string
  createdAt: Date
}

// Mock database - In production, use a real database
const users: User[] = [
  {
    id: "1",
    email: "customer@example.com",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    role: "customer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "partner@example.com",
    name: "Wash Master",
    phone: "+91 87654 32109",
    role: "partner",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const customers: Customer[] = [
  {
    id: "1",
    email: "customer@example.com",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    role: "customer",
    loyaltyPoints: 450,
    addresses: [],
    vehicles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const partners: Partner[] = [
  {
    id: "2",
    email: "partner@example.com",
    name: "Wash Master",
    phone: "+91 87654 32109",
    role: "partner",
    businessName: "Wash Master Services",
    isAvailable: true,
    rating: 4.8,
    totalEarnings: 64320,
    servicesOffered: ["basic", "premium", "detailing"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const services: Service[] = [
  {
    id: "1",
    name: "Basic Wash",
    description: "Exterior wash, tire shine, and vacuum",
    basePrice: 299,
    duration: 45,
    category: "basic",
    isActive: true,
  },
  {
    id: "2",
    name: "Premium Wash",
    description: "Basic wash plus interior cleaning and wax",
    basePrice: 499,
    duration: 75,
    category: "premium",
    isActive: true,
  },
  {
    id: "3",
    name: "Interior Detailing",
    description: "Deep interior cleaning and sanitization",
    basePrice: 799,
    duration: 120,
    category: "detailing",
    isActive: true,
  },
  {
    id: "4",
    name: "Full Service",
    description: "Complete interior and exterior detailing",
    basePrice: 999,
    duration: 180,
    category: "full",
    isActive: true,
  },
  {
    id: "5",
    name: "Eco Wash",
    description: "Environmentally friendly waterless wash",
    basePrice: 399,
    duration: 60,
    category: "eco",
    isActive: true,
  },
]

const bookings: Booking[] = [
  {
    id: "1",
    customerId: "1",
    partnerId: "2",
    serviceId: "2",
    vehicleId: "1",
    addressId: "1",
    scheduledDate: new Date(),
    scheduledTime: "10:30",
    status: "confirmed",
    totalAmount: 499,
    paymentStatus: "paid",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    customerId: "1",
    serviceId: "1",
    vehicleId: "1",
    addressId: "1",
    scheduledDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    scheduledTime: "14:00",
    status: "completed",
    totalAmount: 299,
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
]

const vehicles: Vehicle[] = [
  {
    id: "1",
    userId: "1",
    make: "Tata",
    model: "Tiago",
    color: "White",
    type: "hatchback",
    registrationNumber: "UP32AB1234",
    isDefault: true,
  },
  {
    id: "2",
    userId: "1",
    make: "Maruti",
    model: "Swift",
    color: "Red",
    type: "hatchback",
    registrationNumber: "UP32CD5678",
    isDefault: false,
  },
]

const addresses: Address[] = [
  {
    id: "1",
    userId: "1",
    street: "123 Main Street",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226001",
    isDefault: true,
  },
]

// Database operations
export const db = {
  users: {
    findById: (id: string) => users.find((u) => u.id === id),
    findByEmail: (email: string) => users.find((u) => u.email === email),
    create: (user: Omit<User, "id" | "createdAt" | "updatedAt">) => {
      const newUser = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.push(newUser)
      return newUser
    },
    update: (id: string, updates: Partial<User>) => {
      const index = users.findIndex((u) => u.id === id)
      if (index !== -1) {
        users[index] = { ...users[index], ...updates, updatedAt: new Date() }
        return users[index]
      }
      return null
    },
  },
  customers: {
    findById: (id: string) => customers.find((c) => c.id === id),
    findAll: () => customers,
    update: (id: string, updates: Partial<Customer>) => {
      const index = customers.findIndex((c) => c.id === id)
      if (index !== -1) {
        customers[index] = { ...customers[index], ...updates, updatedAt: new Date() }
        return customers[index]
      }
      return null
    },
  },
  partners: {
    findById: (id: string) => partners.find((p) => p.id === id),
    findAll: () => partners,
    findAvailable: () => partners.filter((p) => p.isAvailable),
    update: (id: string, updates: Partial<Partner>) => {
      const index = partners.findIndex((p) => p.id === id)
      if (index !== -1) {
        partners[index] = { ...partners[index], ...updates, updatedAt: new Date() }
        return partners[index]
      }
      return null
    },
  },
  services: {
    findAll: () => services.filter((s) => s.isActive),
    findById: (id: string) => services.find((s) => s.id === id),
    findByCategory: (category: string) => services.filter((s) => s.category === category && s.isActive),
  },
  bookings: {
    findAll: () => bookings,
    findById: (id: string) => bookings.find((b) => b.id === id),
    findByCustomerId: (customerId: string) => bookings.filter((b) => b.customerId === customerId),
    findByPartnerId: (partnerId: string) => bookings.filter((b) => b.partnerId === partnerId),
    create: (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) => {
      const newBooking = {
        ...booking,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      bookings.push(newBooking)
      return newBooking
    },
    update: (id: string, updates: Partial<Booking>) => {
      const index = bookings.findIndex((b) => b.id === id)
      if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date() }
        return bookings[index]
      }
      return null
    },
  },
  vehicles: {
    findByUserId: (userId: string) => vehicles.filter((v) => v.userId === userId),
    findById: (id: string) => vehicles.find((v) => v.id === id),
    create: (vehicle: Omit<Vehicle, "id">) => {
      const newVehicle = {
        ...vehicle,
        id: Date.now().toString(),
      }
      vehicles.push(newVehicle)
      return newVehicle
    },
    update: (id: string, updates: Partial<Vehicle>) => {
      const index = vehicles.findIndex((v) => v.id === id)
      if (index !== -1) {
        vehicles[index] = { ...vehicles[index], ...updates }
        return vehicles[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = vehicles.findIndex((v) => v.id === id)
      if (index !== -1) {
        vehicles.splice(index, 1)
        return true
      }
      return false
    },
  },
  addresses: {
    findByUserId: (userId: string) => addresses.filter((a) => a.userId === userId),
    findById: (id: string) => addresses.find((a) => a.id === id),
    create: (address: Omit<Address, "id">) => {
      const newAddress = {
        ...address,
        id: Date.now().toString(),
      }
      addresses.push(newAddress)
      return newAddress
    },
    update: (id: string, updates: Partial<Address>) => {
      const index = addresses.findIndex((a) => a.id === id)
      if (index !== -1) {
        addresses[index] = { ...addresses[index], ...updates }
        return addresses[index]
      }
      return null
    },
    delete: (id: string) => {
      const index = addresses.findIndex((a) => a.id === id)
      if (index !== -1) {
        addresses.splice(index, 1)
        return true
      }
      return false
    },
  },
}
