import React, { useEffect, useCallback } from 'react';
import { Phone, Video, MoreVertical, User } from 'lucide-react';
import Image from 'next/image';
import { Friend, ChatData, Message } from '../types/chat';
import MessageInput from './MessageInput';
import { getSocket } from '@/lib/socket';

interface ChatAreaProps {
  selectedFriend: Friend | null;
  chatData: ChatData;
  setChatData: (data: ChatData | ((prev: ChatData) => ChatData)) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  currentUserId: string; // Add this to identify the current user
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedFriend,
  chatData,
  setChatData,
  newMessage,
  setNewMessage,
  handleSendMessage: onSendMessage,
  messagesEndRef,
  currentUserId,
}) => {
  // Handle socket connection
  useEffect(() => {
    // Join room when selecting a friend
    if (selectedFriend) {
      const socket = getSocket();
      if (socket) {
        socket.emit('join', selectedFriend.id);
      }
    }
  }, [selectedFriend]);

  // Handle messages
  useEffect(() => {
    if (!selectedFriend) return;

    const socket = getSocket();
    if (!socket) return;

    const handleReceivedMessage = (message: { id?: string; senderId: string; receiverId: string; text?: string; content?: string; timestamp?: string }) => {
      // Only process messages from the selected friend
      if (message.senderId !== selectedFriend.id) return;

      setChatData((prev: ChatData) => {
        const currentChat = prev[selectedFriend.id] || [];
        
        // Check for duplicates
        const isDuplicate = currentChat.some(msg => msg.id === message.id);
        if (isDuplicate) return prev;

        const newMsg: Message = {
          id: message.id || `${Date.now()}-received`,
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.text || message.content || '',
          timestamp: new Date(message.timestamp || Date.now()),
          type: 'text'
        };

        return {
          ...prev,
          [selectedFriend.id]: [...currentChat, newMsg]
        };
      });
    };

    const handleMessageDelivered = (delivery: { messageId: string, timestamp: string, saved: boolean, delivered: boolean }) => {
      console.log('Message saved successfully:', delivery);
      // You can update the UI to show the message was saved
      // Even if the user is offline, the message is stored and will be delivered when they come online
    };

    const handleMessageError = (error: { error: string, messageId: string }) => {
      // Only remove if message failed to save
      if (error.error === 'Failed to save message') {
        setChatData((prev: ChatData) => {
          const currentChat = prev[selectedFriend.id] || [];
          return {
            ...prev,
            [selectedFriend.id]: currentChat.filter(msg => msg.id !== error.messageId)
          };
        });
        console.error('Failed to save message:', error.error);
      }
    };

    // Listen for messages, delivery confirmations, and errors
    socket.on('receive-message', handleReceivedMessage);
    socket.on('message-delivered', handleMessageDelivered);
    socket.on('message-error', handleMessageError);

    return () => {
      socket.off('receive-message', handleReceivedMessage);
      socket.off('message-delivered', handleMessageDelivered);
      socket.off('message-error', handleMessageError);
    };
  }, [selectedFriend, setChatData]);

  // Format time helper - memoized to prevent unnecessary re-renders
  const formatTime = useCallback((date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  // Send message handler
  const handleSendMessage = useCallback(() => {
    if (!selectedFriend || !newMessage.trim()) return;

    const socket = getSocket();
    if (!socket) {
      console.error('Failed to get socket connection');
      return;
    }

    // Create message with unique ID
    const messageId = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const newMsg: Message = {
      id: messageId,
      senderId: currentUserId,
      receiverId: selectedFriend.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    // Update local state for immediate UI feedback
    setChatData((prev: ChatData) => {
      const currentChat = prev[selectedFriend.id] || [];
      return {
        ...prev,
        [selectedFriend.id]: [...currentChat, newMsg]
      };
    });

    // Send via socket
    socket.emit('send-message', {
      id: messageId,
      senderId: currentUserId,
      receiverId: selectedFriend.id,
      text: newMessage.trim(),
      timestamp: newMsg.timestamp.toISOString()
    });

    // Clear input
    onSendMessage();
  }, [selectedFriend, newMessage, onSendMessage, currentUserId, setChatData]);

  // If no friend selected
  if (!selectedFriend) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900/20 p-4">
        <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-xl backdrop-blur-xl max-w-md w-full">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome to ByteRipple Chat
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Select a conversation from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl h-full">
      {/* Chat Header with Back Button for Mobile */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 sm:p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="lg:hidden p-1.5 hover:bg-white/20 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="relative">
              <Image
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                width={40}
                height={40}
                className="rounded-full object-cover shadow"
              />
              {selectedFriend.isOnline && (
                <div className="absolute bottom-0 right-0 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
              )}
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-white text-base sm:text-lg truncate">
                {selectedFriend.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 truncate">
                {selectedFriend.isOnline ? '🟢 Active now' : `Last seen ${selectedFriend.lastSeen}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-all duration-200">
              <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-all duration-200">
              <Video className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-all duration-200">
              <MoreVertical className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {(chatData[selectedFriend.id] || []).map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                message.senderId === currentUserId
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white ml-auto rounded-br-none'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-auto rounded-bl-none border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex flex-col">
                <p className="break-words text-sm sm:text-base">{message.content || message.text}</p>
                <p
                  className={`text-[10px] sm:text-xs mt-1 sm:mt-1.5 ${
                    message.senderId === currentUserId ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}  
      />
    </div>
  );
};

export default ChatArea;
