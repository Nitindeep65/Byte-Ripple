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
    <div className="w-full lg:w-72 flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl lg:border-r border-purple-100 dark:border-purple-900/30 lg:shadow-xl h-full">
      {/* Header */}
      <div className="p-4 border-b border-purple-100 dark:border-purple-900/30 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Chats</h1>
          <button className="p-2 hover:bg-white/20 rounded-full transition-all duration-200">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
        </div>
      </div>

      {/* Online Friends Counter */}
      <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {onlineFriends.length} active now
          </span>
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {filteredFriends.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 dark:text-gray-400">No friends found</p>
          </div>
        ) : (
          filteredFriends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => setSelectedFriend(friend)}
            className={`p-3 mx-2 my-1 rounded-lg cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200 ${
              selectedFriend?.id === friend.id ? 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 shadow-md' : ''
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
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{friend.name}</h3>
                  {friend.unreadCount! > 0 && (
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center shadow-lg">
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
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
