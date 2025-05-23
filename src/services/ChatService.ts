// services/ChatService.ts
import { io, Socket } from 'socket.io-client';
import { get, post, patch } from '@/utils/api';
import { getAccessToken } from '@/utils/tokenUtils';

export interface Conversation {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  status: string;
  first_message_at: Date;
  last_message_at: Date;
  unread_count_buyer: number;
  unread_count_seller: number;
  created_at: Date;
  updated_at: Date;
  listing?: {
    id: string;
    make: { name: string };
    model: { name: string };
    year: { year: number };
  };
  last_message?: {
    content: string;
    created_at: Date;
    sender_id: string;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  message_type: string;
  content: string;
  is_read: boolean;
  is_deleted: boolean;
  created_at: Date;
  sender?: {
    id: string;
    username: string;
    profile_picture_url?: string;
  };
}

export interface CreateConversationResponse {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
}

class ChatService {
  private socket: Socket | null = null;
  private messageListeners: Map<string, ((message: Message) => void)[]> = new Map();
  private typingListeners: Map<string, ((data: any) => void)[]> = new Map();
  private messagesReadListeners: Map<string, ((data: any) => void)[]> = new Map();
  private baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:3000';
  private connectionPromise: Promise<void> | null = null;
  private userId: string | null = null;

  // Initialize socket connection
  initialize() {
    if (this.connectionPromise) return this.connectionPromise;

    const token = getAccessToken();
    console.log('Token for socket connection:', !!token);
    
    if (!token) return Promise.resolve();

    // Decode token to get user ID
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      this.userId = decoded?.sub || null;
      console.log(this.userId);
      
    } catch (error) {
      console.error('Error decoding token:', error);
    }

    this.connectionPromise = new Promise((resolve) => {
      this.socket = io(this.baseUrl, {
        auth: { token },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      this.setupSocketListeners();
      
      this.socket.on('connect', () => {
        console.log('Connected to chat server');
        resolve();
      });
      
      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        resolve(); // Resolve anyway to prevent hanging
      });
    });

    return this.connectionPromise;
  }

  private setupSocketListeners() {
    if (!this.socket) return;

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      this.connectionPromise = null; // Reset connection promise on disconnect
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    this.socket.on('newMessage', (message: Message) => {
      console.log('New message received:', message);
      const listeners = this.messageListeners.get(message.conversation_id) || [];
      listeners.forEach(listener => listener(message));
    });

    this.socket.on('userTyping', (data) => {
      const listeners = this.typingListeners.get(data.conversationId) || [];
      listeners.forEach(listener => listener(data));
    });

    this.socket.on('messagesRead', (data) => {
      const listeners = this.messagesReadListeners.get(data.conversationId) || [];
      listeners.forEach(listener => listener(data));
    });
    
    this.socket.on('messageError', (error) => {
      console.error('Message error received:', error);
    });
  }

  // Create a new conversation
  async createConversation(listingId: string): Promise<CreateConversationResponse> {
    return post<CreateConversationResponse>('/chat/conversations', {
      data: { listing_id: listingId }
    });
  }

  // Get all conversations for the current user
  async getConversations(): Promise<Conversation[]> {
    return get<Conversation[]>('/chat/conversations');
  }

  // Get a specific conversation by ID
  async getConversation(conversationId: string): Promise<Conversation> {
    return get<Conversation>(`/chat/conversations/${conversationId}`);
  }

  // Get messages for a conversation with pagination
  async getMessages(conversationId: string, page = 1, limit = 20): Promise<any[]> {
    return get<any[]>(`/chat/conversations/${conversationId}/messages`, {
      params: { page, limit }
    });
  }

  // Mark all messages in a conversation as read
  async markAsRead(conversationId: string): Promise<void> {
    await patch(`/chat/conversations/${conversationId}/read`);
    
    // Also emit through socket if connected
    if (this.socket?.connected) {
      this.socket.emit('markAsRead', { conversationId });
    }
  }

  // Archive a conversation
  async archiveConversation(conversationId: string): Promise<void> {
    await patch(`/chat/conversations/${conversationId}/archive`);
  }

  // Join a conversation room via socket
  async joinConversation(conversationId: string) {
    await this.initialize();
    if (this.socket?.connected) {
      console.log('Joining conversation room:', conversationId);
      this.socket.emit('joinConversation', conversationId);
    } else {
      console.warn('Socket not connected. Cannot join conversation:', conversationId);
    }
  }

  // Leave a conversation room
  leaveConversation(conversationId: string) {
    if (this.socket?.connected) {
      this.socket.emit('leaveConversation', conversationId);
    }
  }

  // Send a message via socket
  async sendMessage(conversationId: string, content: string): Promise<boolean> {
    await this.initialize();
    
    if (!this.socket?.connected) {
      console.error('Socket not connected. Cannot send message.');
      return false;
    }
    
    if (!this.userId) {
      console.error('User ID unknown. Cannot send message.');
      return false;
    }
    
    console.log('Sending message via socket:', {
      conversation_id: conversationId,
      sender_id: this.userId,
      content,
      message_type: 'text'
    });
    
    this.socket.emit('sendMessage', {
      conversation_id: conversationId,
      sender_id: this.userId,
      content,
      message_type: 'text'
    });
    
    return true;
  }

  // Send typing indicator
  sendTypingIndicator(conversationId: string, isTyping: boolean): void {
    if (this.socket?.connected) {
      this.socket.emit('typing', { conversationId, isTyping });
    }
  }

  // Add a listener for new messages in a specific conversation
  onNewMessage(conversationId: string, callback: (message: Message) => void) {
    if (!this.messageListeners.has(conversationId)) {
      this.messageListeners.set(conversationId, []);
    }
    this.messageListeners.get(conversationId)?.push(callback);
  }

  // Remove a message listener
  offNewMessage(conversationId: string, callback: (message: Message) => void) {
    const listeners = this.messageListeners.get(conversationId) || [];
    this.messageListeners.set(
      conversationId,
      listeners.filter(listener => listener !== callback)
    );
  }

  // Add a listener for typing indicators
  onTyping(conversationId: string, callback: (data: any) => void) {
    if (!this.typingListeners.has(conversationId)) {
      this.typingListeners.set(conversationId, []);
    }
    this.typingListeners.get(conversationId)?.push(callback);
  }

  // Remove a typing listener
  offTyping(conversationId: string, callback: (data: any) => void) {
    const listeners = this.typingListeners.get(conversationId) || [];
    this.typingListeners.set(
      conversationId,
      listeners.filter(listener => listener !== callback)
    );
  }

  // Add a listener for messages read
  onMessagesRead(conversationId: string, callback: (data: any) => void) {
    if (!this.messagesReadListeners.has(conversationId)) {
      this.messagesReadListeners.set(conversationId, []);
    }
    this.messagesReadListeners.get(conversationId)?.push(callback);
  }

  // Remove a messages read listener
  offMessagesRead(conversationId: string, callback: (data: any) => void) {
    const listeners = this.messagesReadListeners.get(conversationId) || [];
    this.messagesReadListeners.set(
      conversationId,
      listeners.filter(listener => listener !== callback)
    );
  }

  // Get current user ID
  getCurrentUserId(): string | null {
    return this.userId;
  }

  cleanup() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.messageListeners.clear();
    this.typingListeners.clear();
    this.messagesReadListeners.clear();
    this.connectionPromise = null;
    this.userId = null;
  }
}

// Export singleton instance
const chatService = new ChatService();
export default chatService;