import React from 'react';
import { Phone, Video, MoreVertical, User } from 'lucide-react';
import Image from 'next/image';
import { Friend, ChatData } from '../types/chat';
import MessageInput from './MessageInput';

interface ChatAreaProps {
  selectedFriend: Friend | null;
  chatData: ChatData;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedFriend,
  chatData,
  newMessage,
  setNewMessage,
  handleSendMessage,
  messagesEndRef,
}) => {
  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(timestamp);
  };

  if (!selectedFriend) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
        <div className="text-center">
          <User className="w-16 h-16 text-purple-300 dark:text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Select a friend to start chatting</h3>
          <p className="text-gray-500 dark:text-gray-400">Choose from your friends list to begin a conversation.</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="flex-1 flex flex-col bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg">
      {/* Chat Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                width={40}
                height={40}
                className="rounded-full object-cover shadow"
              />
              {selectedFriend.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">{selectedFriend.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedFriend.isOnline ? 'Online' : `Last seen ${selectedFriend.lastSeen}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition">
              <Phone className="w-5 h-5 text-purple-500 dark:text-purple-300" />
            </button>
            <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition">
              <Video className="w-5 h-5 text-purple-500 dark:text-purple-300" />
            </button>
            <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition">
              <MoreVertical className="w-5 h-5 text-purple-500 dark:text-purple-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(chatData[selectedFriend.id] || []).map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${
                message.senderId === 'me'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
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
