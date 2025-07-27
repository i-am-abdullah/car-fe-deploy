'use client';
import React, { useEffect, useState } from 'react';
import { useParams} from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Car, User, Clock, MessageSquare, Users, RefreshCw } from 'lucide-react';
import adminChatService, { AdminMessage, AdminConversation } from '@/services/AdminChatService';
import { useAuth } from '@/hooks/useAuth';

export default function AdminChatPage() {
  const { id } = useParams();
  const conversationId = Array.isArray(id) ? id[0] : id as string;
    const { loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [conversation, setConversation] = useState<AdminConversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalMessages, setTotalMessages] = useState(0);

  const loadConversationData = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Get messages first
      const messagesData = await adminChatService.getConversationMessages(conversationId);
      setMessages(messagesData.messages || []);
      setTotalMessages(messagesData.total || 0);
      
      // Get conversations to find the current one
      const conversations = await adminChatService.getAllConversations();
      const currentConversation = conversations.find(c => c.id === conversationId);
      setConversation(currentConversation || null);
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load conversation');
      console.error('Error loading conversation:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!conversationId) return;
    loadConversationData();
  }, [conversationId]);

  const handleRefresh = () => {
    loadConversationData(true);
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    if (!Array.isArray(messages) || messages.length === 0) {
      return [];
    }

    const groups: { date: string; messages: AdminMessage[] }[] = [];

    messages.forEach((message) => {
      if (!message.created_at) {
        console.warn('Message missing created_at:', message);
        return;
      }
      
      const dateString = formatMessageDate(message.created_at);
      const existing = groups.find(g => g.date === dateString);
      if (existing) {
        existing.messages.push(message);
      } else {
        groups.push({ date: dateString, messages: [message] });
      }
    });

    return groups;
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#3D1703] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Chat</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleRefresh}
              className="w-full px-6 py-3 bg-[#3D1703] text-white font-medium rounded-xl hover:bg-[#3D1703] transition-colors"
            >
              Try Again
            </button>
            <Link 
              href="/admin/chat"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Conversations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const carName = conversation?.listing 
    ? `${conversation.listing.make.name} ${conversation.listing.model.name} ${conversation.listing.year.year}`
    : 'Unknown Vehicle';

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/admin/dashboard/conversations" 
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="text-gray-600 hover:text-gray-800" size={20} />
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3D1703] rounded-full flex items-center justify-center shadow-md">
                <Car className="text-white" size={20} />
              </div>
              
              <div>
                <h1 className="font-semibold text-lg text-gray-800">{carName}</h1>
                {conversation && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users size={14} />
                    <span>{conversation.buyer.username} ↔ {conversation.seller.username}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {totalMessages} message{totalMessages !== 1 ? 's' : ''}
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`p-2 rounded-lg transition-colors ${
                refreshing 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-50 text-[#3D1703] hover:bg-[#3D1703]'
              }`}
            >
              <RefreshCw 
                size={18} 
                className={refreshing ? 'animate-spin' : ''} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messageGroups.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-gray-400" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">No Messages Yet</h2>
              <p className="text-gray-600">This conversation hasn't started yet.</p>
            </div>
          </div>
        ) : (
          messageGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              {/* Date Divider */}
              <div className="flex justify-center my-6">
                <div className="bg-white text-gray-600 text-sm px-4 py-2 rounded-full shadow-sm border border-gray-200 font-medium">
                  <Clock className="inline mr-2" size={14} />
                  {group.date}
                </div>
              </div>
              
              {/* Messages */}
              {group.messages.map((message, index) => {
                const prevMessage = index > 0 ? group.messages[index - 1] : null;
                const isConsecutive = prevMessage && prevMessage.sender_id === message.sender_id;
                
                return (
                  <div key={message.id} className={`flex items-start space-x-3 ${isConsecutive ? 'mt-1' : 'mt-4'}`}>
                    {/* Avatar */}
                    {!isConsecutive && (
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                        <User className="text-white" size={16} />
                      </div>
                    )}
                    {isConsecutive && <div className="w-8"></div>}
                    
                    {/* Message Content */}
                    <div className="flex-grow">
                      {!isConsecutive && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">
                            {message.sender.username}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatMessageTime(message.created_at)}
                          </span>
                        </div>
                      )}
                      
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
                        <p className="text-gray-800 text-sm leading-relaxed break-words">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
      
      {/* Footer Info */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Conversation ID: {conversationId}</span>
            {conversation && (
              <span>Status: {conversation.status}</span>
            )}
          </div>
          <div>
            Admin View - Read Only
          </div>
        </div>
      </div>
    </div>
  );
}