import React from 'react';
import { Search, Settings } from 'lucide-react';
import Image from 'next/image';
import { Friend } from '../types/chat';

interface SidebarProps {
  friends: Friend[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFriend: Friend | null;
  setSelectedFriend: (friend: Friend) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  friends,
  searchTerm,
  setSearchTerm,
  selectedFriend,
  setSelectedFriend,
}) => {
  const formatLastSeen = (lastSeen: Date) => lastSeen.toLocaleString();
  const onlineFriends = friends.filter(friend => friend.isOnline);
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 flex flex-col bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Messages</h1>
          <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition">
            <Settings className="w-5 h-5 text-purple-500 dark:text-purple-300" />
          </button>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/60 dark:bg-gray-900/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Online Friends Counter */}
      <div className="px-4 py-3 bg-purple-50 dark:bg-purple-900/40 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-purple-700 dark:text-purple-300">
            {onlineFriends.length} friend{onlineFriends.length !== 1 ? 's' : ''} online
          </span>
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => setSelectedFriend(friend)}
            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors ${
              selectedFriend?.id === friend.id ? 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 border-r-4 border-purple-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                                  <Image
                    src={friend.avatar}
                    alt={friend.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover shadow"
                  />
                {friend.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{friend.name}</h3>
                  {friend.unreadCount! > 0 && (
                    <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {friend.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{friend.lastMessage}</p>
                  {!friend.isOnline && friend.lastSeen && (
                    <span className="text-xs text-gray-400">{formatLastSeen(friend.lastSeen)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
