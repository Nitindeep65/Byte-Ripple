import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/model/user";
import bcrypt from "bcryptjs";

// 🔹 GET all users (without password)
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    let users;
    const userId = searchParams?.get("userId");
    
    if (userId && userId !== 'undefined' && userId !== 'null') {
      users = await User.find({ _id: { $ne: userId } }, "-password -__v");
    } else {
      // If no valid userId is provided, return empty array for safety
      users = [];
    }
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
    const { username, email, password: rawPassword, avatar } = body || {};

    if (!username || !email || !rawPassword) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    await connectToDatabase();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || "/default-avatar.png", // ✅ fallback
      isOnline: false,
      lastSeen: Date.now(),
    });

    await newUser.save();

    // return safe object (exclude sensitive fields)
    const userObj = newUser.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, __v: _v, ...userSafe } = userObj;

    return NextResponse.json(
      { msg: "User created successfully", user: userSafe },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/auth/users error:", error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
