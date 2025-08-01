import { db } from "./db"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "customer" | "partner" | "admin"
}

// Mock authentication - In production, use proper JWT tokens
let currentUser: AuthUser | null = {
  id: "1",
  email: "customer@example.com",
  name: "Rahul Sharma",
  role: "customer",
}

export const auth = {
  getCurrentUser: (): AuthUser | null => currentUser,

  login: async (email: string, password: string): Promise<AuthUser | null> => {
    // Mock login - In production, verify password hash
    const user = db.users.findByEmail(email)
    if (user) {
      currentUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
      return currentUser
    }
    return null
  },

  logout: () => {
    currentUser = null
  },

  register: async (userData: {
    email: string
    password: string
    name: string
    phone: string
    role: "customer" | "partner"
  }): Promise<AuthUser | null> => {
    // Mock registration - In production, hash password
    const existingUser = db.users.findByEmail(userData.email)
    if (existingUser) {
      throw new Error("User already exists")
    }

    const newUser = db.users.create({
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      role: userData.role,
    })

    currentUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    }

    return currentUser
  },

  requireAuth: (): AuthUser => {
    if (!currentUser) {
      throw new Error("Authentication required")
    }
    return currentUser
  },

  requireRole: (role: string): AuthUser => {
    const user = auth.requireAuth()
    if (user.role !== role) {
      throw new Error("Insufficient permissions")
    }
    return user
  },
}
