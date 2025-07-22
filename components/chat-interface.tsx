'use client';

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
  User,
  Calendar
} from 'lucide-react';
import { useSessionId } from '@/hooks/use-session-id';
import { useChatHistory, ChatMessage } from '@/hooks/use-chat-history';
import { useChatInterface } from '@/hooks/use-chat-interface';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  slug: string;
}

// Calendar widget component
function CalendarWidget() {
  useEffect(() => {
    // Load Cal.com script if not already loaded
    if (!window.Cal) {
      const script = document.createElement('script');
      script.src = 'https://cal.uninovasolutions.com/embed/embed.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        window.Cal("init", "15min", {origin:"https://cal.uninovasolutions.com"});
        window.Cal.ns["15min"]("inline", {
          elementOrSelector:"#my-cal-inline",
          config: {"layout":"month_view"},
          calLink: "uninova/15min",
        });
        window.Cal.ns["15min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      };
    } else {
      // Cal is already loaded, just initialize
      window.Cal("init", "15min", {origin:"https://cal.uninovasolutions.com"});
      window.Cal.ns["15min"]("inline", {
        elementOrSelector:"#my-cal-inline",
        config: {"layout":"month_view"},
        calLink: "uninova/15min",
      });
      window.Cal.ns["15min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    }
  }, []);

  return (
    <div className="mt-4 p-4 glass rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-white/80" />
        <span className="text-white/80 text-sm font-medium">Terminbuchung</span>
      </div>
      <div 
        style={{width:'100%', height:'500px', overflow:'scroll'}} 
        id="my-cal-inline"
        className="rounded-lg bg-white/5"
      />
    </div>
  );
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
      // Direct call to N8N webhook since we can't use API routes in static export
      const webhookUrl = 'https://n8n.uninovasolutions.com/webhook-test/ai-chat';
      
      // Prepare chat history as markdown string
      const chat_history = messages.map(msg => {
        const sender = msg.sender === 'bot' ? 'Agent' : 'User';
        const timestamp = msg.timestamp.toLocaleString('de-DE');
        return `**${sender}** (${timestamp}): ${msg.text}`;
      }).join('\n\n');
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sid: sessionId,
          slug,
          message: messageText,
          chat_history,
        }),
      });

      if (response.status === 429) {
        // Rate limited - block input for 30 seconds
        setIsBlocked(true);
        setBlockTimer(30);
        toast.error('Bitte kurz warten …');
        setIsTyping(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Simulate typing delay for better UX
      setTimeout(() => {
        const responseText = data.text || data.message || 'Entschuldigung, bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten.';
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
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
                        <p className="text-sm">
                          {message.text.replace('[[openCalendar]]', '').trim() || message.text}
                        </p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-white/50'
                        }`}>
                          {message.timestamp.toLocaleTimeString('de-DE', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      
                      {/* Show calendar widget if message contains [[openCalendar]] */}
                      {message.sender === 'bot' && message.text.includes('[[openCalendar]]') && (
                        <div className="w-full mt-2">
                          <CalendarWidget />
                        </div>
                      )}
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