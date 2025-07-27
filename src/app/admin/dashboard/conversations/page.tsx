'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// Using native Date methods instead of date-fns
import { MessageSquare, Car, Users, Clock } from 'lucide-react';
import AdminChatService from '@/services/AdminChatService';
import { AdminConversation } from '@/services/AdminChatService';
import { useAuth } from '@/hooks/useAuth';

export default function AdminConversationsPage() {
  const [conversations, setConversations] = useState<AdminConversation[]>([]);
    const { loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await AdminChatService.getAllConversations();
        setConversations(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load conversations');
        console.error('Error fetching conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const formatMessageTime = (date: string) => {
    if (!date) return '';
    const messageDate = new Date(date);
    const today = new Date();
    
    // Same day - show only time
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    }
    
    // Within the last week - show day name
    const daysDiff = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
    }
    
    // Older - show date
    return messageDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3D1703] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Conversations</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#3D1703] rounded-lg">
                <MessageSquare className="w-6 h-6 text-[#3D1703]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chat Monitor</h1>
                <p className="text-gray-600">Monitor all user conversations</p>
              </div>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-[#3D1703] font-medium">{conversations.length} Active Conversations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {conversations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-gray-700 mb-2">No conversations found</h2>
            <p className="text-gray-500">There are currently no active conversations to monitor.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle & Users
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conversations.map((conversation) => {
                    const carName = conversation.listing 
                      ? `${conversation.listing.make.name} ${conversation.listing.model.name} ${conversation.listing.year.year}`
                      : 'Unknown Vehicle';
                    
                    const lastMessageTime = conversation.last_message 
                      ? formatMessageTime(conversation.last_message.created_at) 
                      : 'No messages';

                    return (
                      <tr key={conversation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#3D1703] flex items-center justify-center flex-shrink-0">
                              <Car className="w-5 h-5 text-[#3D1703]" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{carName}</div>
                              <div className="text-sm text-gray-500 flex items-center space-x-2">
                                <span className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {conversation.buyer.username} ↔ {conversation.seller.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {conversation.last_message?.content || 'No messages yet'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            conversation.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {conversation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {lastMessageTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link 
                            href={`/admin/dashboard/conversations/${conversation.id}`}
                            className="text-[#3D1703] hover:text-[#3D1703] transition-colors"
                          >
                            View Chat
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}