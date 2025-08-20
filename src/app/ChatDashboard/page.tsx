"use client"
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Friend, ChatData, Message, User } from './types/chat';

// Fix type for useRef
type RefType = React.MutableRefObject<HTMLDivElement | null>;

const ChatDashboard = () => {
  const [newMessage, setNewMessage] = useState('');
  const [chatData, setChatData] = useState<ChatData>({});
  const messagesEndRef: RefType = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

useEffect(() => {
    async function fetchFriends() {
      try {
        const res = await fetch("/api/auth/users");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const mapped: Friend[] = data.map((user: User) => ({
          id: user._id,
          name: user.username,
          avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
          isOnline: user.isOnline || false,
          lastSeen: user.lastSeen || new Date().toISOString(),
          lastMessage: "No messages yet",
          unreadCount: 0,
        }));

        setFriends(mapped);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch friends:", err);
        setError("Failed to load friends. Please try again later.");
      }
    }
    fetchFriends();
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedFriend) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setChatData(prev => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMsg]
    }));

    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData]);

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen font-montserrat bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar 
        friends={friends}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
      />
      <ChatArea 
        selectedFriend={selectedFriend}
        chatData={chatData}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

export default ChatDashboard;