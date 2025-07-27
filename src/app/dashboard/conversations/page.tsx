'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {format} from 'date-fns';
import chatService, { Conversation } from '@/services/ChatService';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';

export default function ConversationsPage() {
  const { loading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        // Initialize chat service to get current user ID
        await chatService.initialize();
        const userId = chatService.getCurrentUserId();
        setCurrentUserId(userId);
        
        const data = await chatService.getConversations();
        setConversations(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load conversations');
        console.error('Error fetching conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchConversations();
    }
  }, [authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3D1703]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Conversations</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  const formatMessageTime = (date: Date) => {
    if (!date) return '';
    const messageDate = new Date(date);
    const today = new Date();
    
    // Same day - show only time
    if (messageDate.toDateString() === today.toDateString()) {
      return format(messageDate, 'h:mm a');
    }
    
    // Within the last week - show day name
    const daysDiff = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return format(messageDate, 'EEE');
    }
    
    // Older - show date
    return format(messageDate, 'MMM d');
  };

  // Helper function to get unread count for current user
  const getUnreadCount = (conversation: Conversation) => {
    if (!currentUserId) return 0;
    
    // If current user is the buyer, show buyer's unread count
    if (currentUserId === conversation.buyer_id) {
      return conversation.unread_count_buyer;
    }
    // If current user is the seller, show seller's unread count
    else if (currentUserId === conversation.seller_id) {
      return conversation.unread_count_seller;
    }
    
    return 0;
  };

  return (
    <>
      <Header title="My Conversations" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Conversations</h1>
        
        {conversations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-lg font-medium text-gray-700 mb-2">No conversations yet</h2>
            <p className="text-gray-500 mb-4">Start browsing listings and chat with sellers.</p>
            <Link href="/cars" className="inline-block px-5 py-2 bg-[#3D1703] text-white rounded-md hover:bg-[#3D1703] transition-colors">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {conversations.map((conversation) => {
              const carName = conversation.listing 
                ? `${conversation.listing.make.name} ${conversation.listing.model.name} ${conversation.listing.year.year}`
                : 'Unknown Car';
              
              const unreadCount = getUnreadCount(conversation);
              const hasUnread = unreadCount > 0;
              const lastMessageTime = conversation.last_message ? formatMessageTime(conversation.last_message.created_at) : '';
                
              return (
                <Link 
                  href={`/dashboard/conversations/${conversation.id}`} 
                  key={conversation.id}
                  className="block border-b border-gray-200 last:border-b-0 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center p-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-500 text-lg font-semibold">
                        {carName.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">{carName}</h3>
                        <span className="text-xs text-gray-500">{lastMessageTime}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className={`text-sm ${hasUnread ? 'font-semibold text-gray-900' : 'text-gray-500'} truncate max-w-xs`}>
                          {conversation.last_message?.content || 'No messages yet'}
                        </p>
                        
                        {hasUnread && (
                          <span className="bg-[#3D1703] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}