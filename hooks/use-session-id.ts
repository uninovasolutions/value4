'use client';

export function useSessionId() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get session ID cookie
    const getSessionIdCookie = () => {
      const cookies = document.cookie.split(';');
      const sidCookie = cookies.find(cookie => 
        cookie.trim().startsWith('sid=')
      );
      return sidCookie ? sidCookie.split('=')[1] : null;
    };

    // Set session ID cookie (always secure, essential cookie)
    const setSessionIdCookie = (sid: string) => {
      // This is an essential technical cookie - always set regardless of consent
      // It expires in 24 hours for privacy
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      document.cookie = `sid=${sid}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
    };

    // Generate UUID v4
    const generateUUIDv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    const existingSid = getSessionIdCookie();
    
    if (existingSid) {
      setSessionId(existingSid);
    } else {
      // Generate new session ID
      const newSid = generateUUIDv4();
      setSessionId(newSid);
      setSessionIdCookie(newSid);
    }
    
    setIsLoaded(true);
  }, []);

  return { sessionId, isLoaded };
}
</parameter>
</invoke>
<invoke name="file">
<parameter name="filePath">hooks/use-chat-history.ts</parameter>
<parameter name="content">'use client';

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
</parameter>
</invoke>
<invoke name="file">
<parameter name="filePath">app/api/chat/route.ts</parameter>
<parameter name="content">import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const chatRequestSchema = z.object({
  sid: z.string().uuid(),
  slug: z.string().min(1),
  message: z.string().min(1).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = chatRequestSchema.parse(body);
    
    // Get N8N endpoint from environment
    const webhookUrl = 'https://n8n.uninovasolutions.com/webhook/ai-chat';
    
    // Forward request to webhook with blocking wait
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || 'LiquidGlass/1.0',
      },
      body: JSON.stringify({
        sid: validatedData.sid,
        slug: validatedData.slug,
        message: validatedData.message,
      }),
    });
    
    // Handle rate limiting from webhook
    if (webhookResponse.status === 429) {
      return NextResponse.json(
        { 
          error: 'rate_limited',
          message: 'Bitte kurz warten …',
          retryAfter: 30 
        },
        { status: 429 }
      );
    }
    
    if (!webhookResponse.ok) {
      throw new Error(`Webhook error: ${webhookResponse.status}`);
    }
    
    const responseData = await webhookResponse.json();
    
    // Return bot response
    return NextResponse.json({
      text: responseData.text || responseData.message || 'Entschuldigung, ich konnte Ihre Nachricht nicht verarbeiten.',
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'validation_error',
          message: 'Ungültige Anfrage',
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'technical_error',
        message: 'Technischer Fehler' 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
</parameter>
</invoke>
<invoke name="file">
<parameter name="filePath">components/chat-interface.tsx</parameter>
<parameter name="content">'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  User
} from 'lucide-react';
import { useSessionId } from '@/hooks/use-session-id';
import { useChatHistory, ChatMessage } from '@/hooks/use-chat-history';
import { useChatInterface } from '@/hooks/use-chat-interface';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  slug: string;
}

export function ChatInterface({ slug }: ChatInterfaceProps) {
  const { sessionId, isLoaded: sessionLoaded } = useSessionId();
  const { messages, addMessage, isLoaded: historyLoaded } = useChatHistory(sessionId);
  const { isOpen, isMinimized, openChat, closeChat, toggleMinimize } = useChatInterface();
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle rate limit blocking timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBlocked && blockTimer > 0) {
      interval = setInterval(() => {
        setBlockTimer(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimer]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || isBlocked || !sessionLoaded) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message to chat
    addMessage(userMessage);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify({
          sid: sessionId,
          slug,
          message: messageText,
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        // Rate limited - block input for 30 seconds
        setIsBlocked(true);
        setBlockTimer(30);
        toast.error(data.message || 'Bitte kurz warten …');
        setIsTyping(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }

      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: data.text || 'Entschuldigung, bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten.',
          sender: 'bot',
          timestamp: new Date(),
        };

        addMessage(botMessage);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds

    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Technischer Fehler');
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  // Don't render until session is loaded
  if (!sessionLoaded || !historyLoaded) {
    return null;
  }

  if (!isOpen) {
    return (
      <Button
        onClick={openChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl z-50 group"
        size="icon"
        data-testid="chat-fab"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-96 h-[32rem]'
    } max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]`}>
      <div className="glass h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">KI-Assistent</h3>
              <p className="text-white/60 text-xs">
                {isBlocked && blockTimer > 0 
                  ? `Gesperrt für ${blockTimer}s`
                  : isTyping 
                    ? 'Tippt...' 
                    : 'Verbunden'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleMinimize}
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-white/60 hover:text-white hover:bg-white/10"
              data-testid={isMinimized ? "maximize-chat" : "minimize-chat"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              onClick={closeChat}
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <ScrollArea className="flex-1 p-4" data-testid="chat-messages">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-white/60 py-8">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Beginnen Sie eine Unterhaltung</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    data-testid={message.sender === 'bot' ? 'bot-message' : 'user-message'}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                          : 'bg-white/10'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>
                      
                      <div className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-white/50'
                        }`}>
                          {message.timestamp.toLocaleTimeString('de-DE', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white/10 text-white p-3 rounded-2xl">
                        <div className="typing-indicator">
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              {isBlocked && blockTimer > 0 ? (
                <div className="flex items-center justify-center p-4 text-white/60 text-sm">
                  Bitte warten Sie noch {blockTimer} Sekunden...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Schreiben Sie Ihre Nachricht..."
                    disabled={isLoading}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
</parameter>
</invoke>
<invoke name="file">
<parameter name="filePath">components/session-provider.tsx</parameter>
<parameter name="content">'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSessionId } from '@/hooks/use-session-id';

interface SessionContextType {
  sessionId: string;
  isLoaded: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const { sessionId, isLoaded } = useSessionId();

  return (
    <SessionContext.Provider value={{ sessionId, isLoaded }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
}
</parameter>
</invoke>
<invoke name="file">
<parameter name="filePath">app/layout.tsx</parameter>
<parameter name="content">import './globals.css';
import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from '@/components/session-provider';
import { ConsentBanner } from '@/components/consent-banner';

const kumbhSans = Kumbh_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kumbh-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Liquid Glass Demo',
    default: 'Liquid Glass Demo - KI-gestützte Business-Lösungen',
  },
  description: 'Erleben Sie die Zukunft der Business-Automatisierung mit unseren KI-gestützten Lösungen. Schön, schnell und intelligent.',
  keywords: ['KI', 'Automatisierung', 'Business', 'Chat', 'Assistent', 'Liquid Glass', 'Modern'],
  authors: [{ name: 'Liquid Glass Demo' }],
  creator: 'Liquid Glass Demo',
  publisher: 'Liquid Glass Demo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Liquid Glass Demo',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={kumbhSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#1c274f" />
        <meta name="theme-color" content="#1c274f" />
      </head>
      <body className={kumbhSans.className} suppressHydrationWarning>
        <div className="liquid-background" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <ConsentBanner />
            <Toaster 
              position="top-right"
              expand
              richColors
              closeButton
            />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
</parameter>
</invoke>
<invoke name="shell">
<parameter name="command">rm hooks/use-session.ts</parameter>
</invoke>
