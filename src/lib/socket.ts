// src/lib/socket.ts
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
  path: "/api/socket",
  addTrailingSlash: false,
});

export default socket;
