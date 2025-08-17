import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/model/user";

export async function POST(request) {
  try {
    console.log("API /api/auth/users called");
    const body = await request.json();
    console.log("Request body:", body);

    // quick validate
    const { username, email, password } = body || {};
    if (!username || !email || !password) {
      console.log("Validation failed: missing fields");
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    // test DB connection separately
    try {
      await connectToDatabase();
      console.log("DB connected");
    } catch (dbErr) {
      console.error("DB connect error:", dbErr);
      return NextResponse.json({ msg: "DB connection failed" }, { status: 500 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return NextResponse.json(
      { msg: "User created successfully", user: { username, email, password } },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/auth/users error:", error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}