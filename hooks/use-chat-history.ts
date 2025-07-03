'use client';

import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function useChatHistory(sessionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    // Load chat history from sessionStorage
    const loadChatHistory = () => {
      try {
        const storageKey = `chat_${sessionId}`;
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
      setIsLoaded(true);
    };

    loadChatHistory();
  }, [sessionId]);

  // Save to sessionStorage whenever messages change
  useEffect(() => {
    if (!sessionId || !isLoaded) return;

    try {
      const storageKey = `chat_${sessionId}`;
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }, [messages, sessionId, isLoaded]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearHistory = () => {
    setMessages([]);
    if (sessionId) {
      try {
        const storageKey = `chat_${sessionId}`;
        sessionStorage.removeItem(storageKey);
      } catch (error) {
        console.error('Error clearing chat history:', error);
      }
    }
  };

  return {
    messages,
    addMessage,
    clearHistory,
    isLoaded
  };
}