"use client"
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import MobileMenu from './components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import { Friend, ChatData, User } from './types/chat';
import { initSocket } from '@/lib/socket';

// Fix type for useRef
type RefType = React.MutableRefObject<HTMLDivElement | null>;

const ChatDashboard = () => {
  const [newMessage, setNewMessage] = useState('');
  const [chatData, setChatData] = useState<ChatData>({});
  const messagesEndRef: RefType = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>(''); // Add current user ID state
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');

  // Get user ID and initialize socket
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUserId(user._id);
      
      // Initialize socket with user ID and handle reconnection
      const socket = initSocket(user._id);
      socket?.on('connect', () => {
        console.log('Socket connected');
      });
    }
  }, []);

useEffect(() => {
    async function fetchFriends() {
      try {
        const res = await fetch(`/api/auth/users?userId=${currentUserId}`);
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
  }, [currentUserId]);

  const handleSendMessage = () => {
    // Clear the message input after sending
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData]);

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  // If there's a general error, show it
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If no user ID is found, redirect to login
  if (!currentUserId) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">Please log in</h1>
          <p className="text-gray-600 mb-4">You need to be logged in to access the chat.</p>
          <a
            href="/auth/Login"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors inline-block"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <ThemeToggle />
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          friends={friends}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
      </div>
      
      {/* Mobile Sidebar */}
      {activeTab === 'chats' && (
        <div className="lg:hidden fixed inset-0 z-30" style={{ paddingTop: '60px' }}>
          <Sidebar 
            friends={friends}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFriend={selectedFriend}
            setSelectedFriend={setSelectedFriend}
          />
        </div>
      )}
      
      {/* Chat Area - Responsive */}
      <div className={`flex-1 ${selectedFriend && activeTab === 'chats' ? 'block' : 'hidden lg:block'}`}>
        <ChatArea 
          selectedFriend={selectedFriend}
          chatData={chatData}
          setChatData={setChatData}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
};

export default ChatDashboard;