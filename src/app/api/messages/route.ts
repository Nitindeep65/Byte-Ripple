import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Message from "@/model/Message";

// 🔹 Send a message
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { senderId, receiverId, content, type } = await request.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    const newMessage = new Message({ senderId, receiverId, content, type });
    await newMessage.save();

    return NextResponse.json(
      { msg: "Message sent", message: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/messages error:", error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}

// 🔹 Get chat history between two users
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const senderId = searchParams.get("senderId");
    const receiverId = searchParams.get("receiverId");

    if (!senderId || !receiverId) {
      return NextResponse.json({ msg: "Missing senderId or receiverId" }, { status: 400 });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // oldest → newest

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("API /api/messages error:", error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
