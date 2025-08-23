// app/api/auth/signup/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    // Ensure Content-Type is application/json
    const contentType = req.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ success: false, message: "Invalid content type" }, { status: 400 })
    }

    const { email, password, role } = await req.json()

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    })

    return NextResponse.json({ success: true, user: newUser })
  } catch (error) {
    console.error("Signup error:", error)
    // Fallback for unexpected errors (like parsing errors)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}