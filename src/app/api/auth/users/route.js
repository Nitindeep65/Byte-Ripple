import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/model/user";
import bcrypt from "bcryptjs";

// 🔹 GET all users (without password)
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}, "-password -__v"); // Exclude sensitive fields
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("API /api/auth/users error:", error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}

// 🔹 POST (Signup)
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password, avatar } = body || {};

    if (!username || !email || !password) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    await connectToDatabase();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || "/default-avatar.png", // ✅ fallback
      isOnline: false,
      lastSeen: Date.now(),
    });

    await newUser.save();

    // return safe object (exclude password)
    const { password: _, __v, ...userSafe } = newUser.toObject();

    return NextResponse.json(
      { msg: "User created successfully", user: userSafe },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/auth/users error:", error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
