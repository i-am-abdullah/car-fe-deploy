// services/AdminChatService.ts
import { get } from '@/utils/api';

export interface AdminMessage {
  id: string;
  sender_id: string;
  message_type: string;
  content: string;
  is_read: boolean;
  is_deleted: boolean;
  created_at: string;
  sender: {
    id: string;
    username: string;
    profile_picture_url: string;
  };
}

export interface AdminConversation {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  status: string;
  first_message_at: string;
  last_message_at: string;
  unread_count_buyer: number;
  unread_count_seller: number;
  listing: {
    id: string;
    status: string;
    meter_reading: number;
    price: string;
    color: string;
    location: string;
    listing_date: string;
    make: {
      id: string;
      name: string;
      image_url: string;
    };
    model: {
      id: string;
      name: string;
      image_url: string;
    };
    year: {
      id: string;
      year: number;
    };
  };
  buyer: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
  seller: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
  last_message: {
    content: string;
    created_at: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AdminMessagesResponse {
  messages: AdminMessage[];
  total: number;
}

class AdminChatService {
  async getAllConversations(): Promise<AdminConversation[]> {
    return get<AdminConversation[]>('/admin/chat/conversations');
  }

  async getConversationMessages(conversationId: string, page = 1, limit = 100): Promise<AdminMessagesResponse> {
    return get<AdminMessagesResponse>(`/admin/chat/conversations/${conversationId}/messages`, {
      params: { page, limit }
    });
  }
}

export default new AdminChatService();