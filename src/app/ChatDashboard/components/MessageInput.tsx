import React from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
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
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-purple-100 dark:border-purple-900/30 p-3 sm:p-4">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button className="p-2 sm:p-2.5 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-full transition-all duration-200 group">
          <Paperclip className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-sm sm:text-base text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 sm:p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 group">
            <Smile className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
          </button>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="p-2.5 sm:p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <Send className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
