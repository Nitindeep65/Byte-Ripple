export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
  lastMessage: string;
  unreadCount: number;
}

export interface ChatData {
  [key: string]: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: string;
}

export interface User {
  _id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
}