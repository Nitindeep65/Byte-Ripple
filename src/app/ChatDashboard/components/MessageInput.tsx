import React, { useEffect, useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import socket from "@/lib/socket";

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}
interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition">
          <Paperclip className="w-5 h-5 text-purple-500 dark:text-purple-300" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white/60 dark:bg-gray-900/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition">
            <Smile className="w-5 h-5 text-purple-500 dark:text-purple-300" />
          </button>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
