import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: string) => {
  if (!socket) {
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
    socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      path: '/api/socketio',
    });

    // Add error handling
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      socket = null;
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      socket = null;
    });

    socket.on('connect', () => {
      // Authenticate socket after connection
      socket?.emit('authenticate', userId);
    });
  } else {
    // Re-authenticate if socket exists but user changed
    socket.emit('authenticate', userId);
  }
  return socket;
};

export const getSocket = () => {
  const userStr = localStorage.getItem('user');
  if (!socket && userStr) {
    const user = JSON.parse(userStr);
    return initSocket(user._id);
  }
  return socket;
};

export default getSocket;
