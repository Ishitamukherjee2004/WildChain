// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const { email, password } = await req.json();

//     // check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // check password
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     return NextResponse.json({ message: "Login successful", user }, { status: 200 });
//   } catch (err) {
//     console.error("Signin error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { email, password, role } = await req.json()

    if (!email || !password || !role) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 })
    }

    // check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // check password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // check role matches
    if (user.role !== role) {
      return NextResponse.json({ success: false, message: "Role mismatch" }, { status: 403 })
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    )

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: { email: user.email, role: user.role },
        token,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error("Signin error:", err)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}
