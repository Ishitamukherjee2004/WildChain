"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "user" | "admin" | null

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRole
  signIn: (email: string, password: string, role: UserRole) => Promise<boolean>
  signUp: (email: string, password: string, role: UserRole) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedAuth = localStorage.getItem("wildchain_auth")
    if (savedAuth) {
      const { role } = JSON.parse(savedAuth)
      setIsAuthenticated(true)
      setUserRole(role)
    }
    setIsLoading(false)
  }, [])

  // const signIn = async (email: string, password: string, role: UserRole): Promise<boolean> => {
  //   setIsLoading(true)
  //   try {
  //     // Mock authentication - in real app, this would call your API
  //     await new Promise((resolve) => setTimeout(resolve, 1000))

  //     // For demo purposes, accept any email/password
  //     if (email && password && role) {
  //       setIsAuthenticated(true)
  //       setUserRole(role)
  //       localStorage.setItem("wildchain_auth", JSON.stringify({ email, role }))
  //       return true
  //     }
  //     return false
  //   } catch (error) {
  //     console.error("Sign in failed:", error)
  //     return false
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }


  const signIn = async (email: string, password: string, role: UserRole): Promise<boolean> => {
  setIsLoading(true)
  try {
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      console.error("Signin failed:", data.message)
      return false
    }

    // Save to context + localStorage
    setIsAuthenticated(true)
    setUserRole(data.user.role)
    localStorage.setItem(
      "wildchain_auth",
      JSON.stringify({ email: data.user.email, role: data.user.role })
    )

    return true
  } catch (error) {
    console.error("Sign in failed:", error)
    return false
  } finally {
    setIsLoading(false)
  }
}

const signUp = async (email: string, password: string, role: UserRole): Promise<boolean> => {
  setIsLoading(true)
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      console.error("Signup failed:", data.message)
      return false
    }

    // Save to context + localStorage
    setIsAuthenticated(true)
    setUserRole(role)
    localStorage.setItem("wildchain_auth", JSON.stringify({ email, role }))

    return true
  } catch (error) {
    console.error("Sign up failed:", error)
    return false
  } finally {
    setIsLoading(false)
  }
}


  const signOut = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem("wildchain_auth")
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        signIn,
        signUp,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
