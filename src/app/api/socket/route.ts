import { NextRequest } from "next/server";
import { Server as IOServer } from "socket.io";
import { connectToDatabase } from "@/lib/db.js";
import mongoose from "mongoose";

export const runtime = "nodejs"; // ensure Node runtime (not edge)

// Define types for our socket server
declare global {
  var socketIO: IOServer | undefined;
}

// Define message schema
const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    if (!global.socketIO) {
      // @ts-expect-error - Next.js server instance
      const server = req.socket.server;
      
      if (!server) {
        throw new Error("HTTP server not found");
      }

      const io = new IOServer(server, {
        path: "/api/socket",
        addTrailingSlash: false,
        cors: {
          origin: process.env.NEXT_PUBLIC_APP_URL || "*",
          methods: ["GET", "POST"],
          credentials: true,
        },
      });

      io.on("connection", (socket) => {
        console.log("⚡ User connected:", socket.id);

        socket.on("join", (userId: string) => {
          socket.join(userId);
          console.log(`User ${userId} joined room`);
        });

        socket.on("sendMessage", async ({ senderId, receiverId, text }: {
          senderId: string;
          receiverId: string;
          text: string;
        }) => {
          try {
            const msg = new Message({ senderId, receiverId, text });
            await msg.save();

            io.to(receiverId).emit("receiveMessage", msg);
            io.to(senderId).emit("receiveMessage", msg);
          } catch (error) {
            console.error("Error saving message:", error);
            socket.emit("error", "Failed to send message");
          }
        });

        socket.on("disconnect", () => {
          console.log("❌ User disconnected:", socket.id);
        });
      });

      // Save the io instance globally
      global.socketIO = io;
    }

    return new Response("Socket server running", { status: 200 });
  } catch (error) {
    console.error("Socket initialization error:", error);
    return new Response("Failed to start socket server", { status: 500 });
  }
}
