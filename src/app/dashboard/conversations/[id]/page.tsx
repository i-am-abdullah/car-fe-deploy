'use client';

import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { Send, ArrowLeft, Car, User, Clock, CheckCheck, Check, Smile } from 'lucide-react';
import chatService, { Conversation, Message } from '@/services/ChatService';
import { useAuth } from '@/hooks/useAuth';

export default function ChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const { loading: authLoading } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationId = Array.isArray(id) ? id[0] : id as string;
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Set current user ID from ChatService
  useEffect(() => {
    if (!authLoading) {
      // Initialize chat service first
      chatService.initialize().then(() => {
        const userId = chatService.getCurrentUserId();
        console.log('Current user ID:', userId);
        setCurrentUserId(userId);
      });
    }
  }, [authLoading]);
  
  // Load conversation and messages
  useEffect(() => {
    if (authLoading || !conversationId) return;
    
    const loadConversationData = async () => {
      try {
        setLoading(true);
        
        // Get conversation details
        const conversationData = await chatService.getConversation(conversationId);
        setConversation(conversationData);
        
        // Get messages
        const messagesData:any = await chatService.getMessages(conversationId);
        if (Array.isArray(messagesData)) {
          setMessages(messagesData);
        } else if (messagesData && messagesData.messages) {
          setMessages(messagesData.messages);
        } else {
          console.error('Unexpected messages data format:', messagesData);
          setMessages([]);
        }
        
        // Mark messages as read
        await chatService.markAsRead(conversationId);
        
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load conversation');
        console.error('Error loading conversation:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadConversationData();
  }, [conversationId, authLoading]);
  
  // Socket connection
  useEffect(() => {
    if (!conversationId || !currentUserId) return;
    
    // Join the conversation room
    const setupSocket = async () => {
      await chatService.joinConversation(conversationId);
    };
    
    setupSocket();
    
    // Add socket message listener
    const handleNewMessage = (message: Message) => {
      console.log('New message received in component:', message);
      setMessages(prev => [...prev, message]);
      
      // If message is from other user, mark as read
      if (message.sender_id !== currentUserId) {
        chatService.markAsRead(conversationId);
      }
    };
    
    // Add typing indicator listener
    const handleTyping = (data: any) => {
      if (data.userId !== currentUserId) {
        setOtherUserTyping(data.isTyping);
      }
    };
    
    // Register listeners
    chatService.onNewMessage(conversationId, handleNewMessage);
    chatService.onTyping(conversationId, handleTyping);
    
    // Cleanup function
    return () => {
      chatService.leaveConversation(conversationId);
      chatService.offNewMessage(conversationId, handleNewMessage);
      chatService.offTyping(conversationId, handleTyping);
    };
  }, [conversationId, currentUserId]);
  
  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      chatService.sendTypingIndicator(conversationId, true);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      chatService.sendTypingIndicator(conversationId, false);
    }, 2000);
  };
  
  // Send message handler
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !conversationId || sending) {
      return;
    }
    
    try {
      setSending(true);
      console.log('Sending message:', newMessage);
      
      const success = await chatService.sendMessage(conversationId, newMessage.trim());
      
      if (!success) {
        console.error('Failed to send message');
        setError('Failed to send message. Please try again.');
      } else {
        // Message sent successfully
        setNewMessage('');
        setError(null);
        // Refocus input
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
    
    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(false);
    chatService.sendTypingIndicator(conversationId, false);
  };
  
  // Format message timestamp
  const formatMessageTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return format(date, 'h:mm a');
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    if (!Array.isArray(messages) || messages.length === 0) {
      return [];
    }

    const groups: { date: string; messages: Message[] }[] = [];

    messages.forEach((message) => {
      if (!message.created_at) {
        console.warn('Message missing created_at:', message);
        return;
      }
      
      const dateString = format(new Date(message.created_at), 'MMMM d, yyyy');
      const existing = groups.find(g => g.date === dateString);
      if (existing) {
        existing.messages.push(message);
      } else {
        groups.push({ date: dateString, messages: [message] });
      }
    });

    return groups;
  };
  
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#3D1703] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading conversation...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/dashboard/conversations"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#3D1703] to-[#3D1703] text-white font-medium rounded-xl hover:from-[#3D1703] hover:to-[#3D1703] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Conversations
          </Link>
        </div>
      </div>
    );
  }
  
  const carName = conversation?.listing 
    ? `${conversation.listing.make.name} ${conversation.listing.model.name} ${conversation.listing.year.year}`
    : 'Conversation';
  
  const messageGroups = groupMessagesByDate();
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/dashboard/conversations" 
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="text-gray-600 hover:text-gray-800" size={20} />
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3D1703] to-[#3D1703] rounded-full flex items-center justify-center shadow-md">
                <Car className="text-white" size={20} />
              </div>
              
              <div>
                <h1 className="font-semibold text-lg text-gray-800">{carName}</h1>
                {otherUserTyping && (
                  <div className="flex items-center space-x-1 text-[#3D1703]">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-[#3D1703] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#3D1703] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1.5 h-1.5 bg-[#3D1703] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm font-medium">Typing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 font-medium">Online</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messageGroups.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-[#3D1703] to-[#3D1703] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="text-[#3D1703]" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Start the conversation</h2>
              <p className="text-gray-600">Send a message to begin chatting about this vehicle.</p>
            </div>
          </div>
        ) : (
          messageGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              {/* Date Divider */}
              <div className="flex justify-center my-6">
                <div className="bg-white/70 backdrop-blur-sm text-gray-600 text-sm px-4 py-2 rounded-full shadow-sm border border-gray-200/50 font-medium">
                  <Clock className="inline mr-2" size={14} />
                  {group.date}
                </div>
              </div>
              
              {/* Messages */}
              {group.messages.map((message, index) => {
                const isMine = message.sender_id === currentUserId;
                const prevMessage = index > 0 ? group.messages[index - 1] : null;
                const isConsecutive = prevMessage && prevMessage.sender_id === message.sender_id;
                
                return (
                  <div 
                    key={message.id} 
                    className={`flex ${isMine ? 'justify-end' : 'justify-start'} ${
                      isConsecutive ? 'mt-1' : 'mt-4'
                    }`}
                  >
                    <div className={`flex items-end space-x-2 max-w-xs md:max-w-md ${isMine ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      {!isMine && !isConsecutive && (
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                          <User className="text-white" size={16} />
                        </div>
                      )}
                      {!isMine && isConsecutive && <div className="w-8"></div>}
                      
                      {/* Message Bubble */}
                      <div className={`group relative ${isMine ? 'ml-auto' : ''}`}>
                        <div 
                          className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                            isMine 
                              ? 'bg-gradient-to-r from-[#3D1703] to-[#3D1703] text-white rounded-br-md shadow-[#3D1703]' 
                              : 'bg-white text-gray-800 rounded-bl-md shadow-gray-200 border border-gray-100'
                          } ${isConsecutive ? (isMine ? 'rounded-tr-2xl' : 'rounded-tl-2xl') : ''}`}
                        >
                          <p className="text-sm leading-relaxed break-words">{message.content}</p>
                          
                          {/* Time and Status */}
                          <div className={`flex items-center justify-end mt-1 space-x-1 ${
                            isMine ? 'text-[#3D1703]' : 'text-gray-500'
                          }`}>
                            <span className="text-xs font-medium">
                              {formatMessageTime(message.created_at)}
                            </span>
                            {isMine && (
                              <div className="flex">
                                {message.is_read ? (
                                  <CheckCheck size={14} className="text-[#3D1703]" />
                                ) : (
                                  <Check size={14} className="text-[#3D1703]" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Enhanced Input Area */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-4">
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          {/* Input Container */}
          <div className="flex-grow relative">
            <div className="flex items-center bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-[#3D1703]/20 focus-within:border-[#3D1703]">
              {/* Attachment Button */}
              
              {/* Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow py-3 px-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                disabled={sending}
                autoFocus
              />
              
              {/* Emoji Button */}
              <button
                type="button"
                className="p-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                disabled={sending}
              >
                <Smile size={20} />
              </button>
            </div>
            
            {/* Sending Status */}
            {sending && (
              <div className="absolute -top-8 left-0 bg-[#3D1703] text-white text-xs px-3 py-1 rounded-full shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className={`p-3 rounded-2xl transition-all duration-200 shadow-lg transform ${
              sending || !newMessage.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-sm' 
                : 'bg-gradient-to-r from-[#3D1703] to-[#3D1703] text-white hover:from-[#3D1703] hover:to-[#3D1703] hover:shadow-xl hover:-translate-y-0.5 active:scale-95'
            }`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}