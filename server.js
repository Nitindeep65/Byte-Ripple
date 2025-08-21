import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import Message from './src/model/Message.js';
import { connectToDatabase } from './src/lib/db.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Keep track of active user sessions and their sockets
const activeSessions = new Map();
const userSockets = new Map();

// Create server with Next.js request handler
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  handle(req, res, parsedUrl);
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/socket.io',
});

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Authenticate socket connection
    socket.on('authenticate', async (userId) => {
      if (!userId) return;

      // Store socket mapping
      userSockets.set(userId, socket.id);
      activeSessions.set(userId, true);
      socket.userId = userId;

      console.log(`User ${userId} authenticated with socket ${socket.id}`);

      // Check for unread messages when user comes online
      try {
        await connectToDatabase();
        const unreadMessages = await Message.find({
          receiverId: userId,
          read: false
        }).sort({ createdAt: 1 });

        if (unreadMessages.length > 0) {
          console.log(`Found ${unreadMessages.length} unread messages for user ${userId}`);
          
          // Send unread messages to the user
          for (const message of unreadMessages) {
            socket.emit('receive-message', {
              id: message._id.toString(),
              senderId: message.senderId.toString(),
              receiverId: message.receiverId.toString(),
              text: message.content,
              timestamp: message.createdAt,
              type: message.type,
              isOfflineMessage: true // Flag to indicate this was received while offline
            });

            // Mark message as read
            message.read = true;
            await message.save();
          }
        }
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      }
    });

    socket.on('join', (friendId) => {
      if (!friendId || !socket.userId) return;
      
      // Join a room for this conversation
      const roomName = [socket.userId, friendId].sort().join('-');
      socket.join(roomName);
      
      console.log(`User ${socket.userId} joined room ${roomName}`);
    });

    socket.on('send-message', async (messageData) => {
      if (!messageData.senderId || !messageData.receiverId || !messageData.text) {
        console.log('Invalid message data');
        return;
      }

      // Verify sender is authenticated and matches socket's user
      if (messageData.senderId !== socket.userId) {
        console.log('Unauthorized message attempt');
        return;
      }

      console.log(`Message from ${messageData.senderId} to ${messageData.receiverId}`);

      try {
        // Always save message to database first
        await connectToDatabase();
        const savedMessage = new Message({
          senderId: messageData.senderId,
          receiverId: messageData.receiverId,
          content: messageData.text,
          type: messageData.type || 'text',
          read: false
        });
        await savedMessage.save();

        // Prepare message with database ID
        const messageToSend = {
          ...messageData,
          id: savedMessage._id.toString(),
          timestamp: savedMessage.createdAt
        };

        // Try to deliver in real-time if user is online
        const receiverSocketId = userSockets.get(messageData.receiverId);
        if (receiverSocketId) {
          // Send to receiver's socket
          io.to(receiverSocketId).emit('receive-message', messageToSend);
          console.log(`Message sent to socket: ${receiverSocketId}`);
        } else {
          console.log('Receiver offline, message saved for later delivery');
        }
        
        // Always confirm successful save to sender
        socket.emit('message-delivered', {
          messageId: savedMessage._id.toString(),
          timestamp: savedMessage.createdAt,
          saved: true,
          delivered: !!receiverSocketId
        });

      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('message-error', {
          error: 'Failed to save message',
          messageId: messageData.id
        });
      }
    });

    socket.on('disconnect', () => {
      if (socket.userId) {
        userSockets.delete(socket.userId);
        activeSessions.delete(socket.userId);
        console.log(`User ${socket.userId} disconnected and removed from active sessions`);
      }
      console.log('Client disconnected:', socket.id);
    });
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

