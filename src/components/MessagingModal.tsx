import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Send, 
  X, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  User,
  MessageCircle,
  Paperclip,
  Smile
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'guide';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideName: string;
  guideImage: string;
  guideSpecialization: string;
  guidePhone?: string;
  guideEmail?: string;
}

export const MessagingModal: React.FC<MessagingModalProps> = ({
  isOpen,
  onClose,
  guideName,
  guideImage,
  guideSpecialization,
  guidePhone,
  guideEmail
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm ${guideName}, your tour guide. I'm excited to help you explore Jharkhand! How can I assist you today?`,
      sender: 'guide',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'read'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate guide typing and response
    setTimeout(() => {
      setIsTyping(false);
      const guideResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateGuideResponse(newMessage),
        sender: 'guide',
        timestamp: new Date(),
        status: 'delivered'
      };
      setMessages(prev => [...prev, guideResponse]);
    }, 2000);
  };

  const generateGuideResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! I'd be happy to help you with that.",
      "Absolutely! I can definitely arrange that for you.",
      "Yes, that's possible. Let me give you more details about it.",
      "I understand your concern. Here's what I can tell you about that.",
      "Perfect! That sounds like a wonderful plan. I can help make it happen.",
      "I'm excited to hear about your interests! Let me share some insights.",
      "That's definitely doable. I'll make sure to include that in our tour.",
      "Great choice! That's one of my favorite places to show visitors.",
      "I'd love to help you with that. Here's what I recommend...",
      "Absolutely! I have extensive experience with that area."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <CheckCircle size={12} className="text-muted-foreground" />;
      case 'delivered':
        return <CheckCircle size={12} className="text-blue-500" />;
      case 'read':
        return <CheckCircle size={12} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={guideImage} 
                  alt={guideName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">{guideName}</DialogTitle>
                <p className="text-sm text-muted-foreground">{guideSpecialization}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === 'user' && (
                      <div className="ml-2">
                        {getStatusIcon(message.status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-background border rounded-lg p-3">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">Typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="flex-shrink-0 p-4 border-t">
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="outline" className="text-xs">
                <Phone size={12} className="mr-1" />
                {guidePhone || '+91 98765 43210'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Mail size={12} className="mr-1" />
                {guideEmail || 'guide@jharkhandexplorer.com'}
              </Badge>
            </div>

            {/* Message Input */}
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="min-h-[40px] max-h-[120px] resize-none"
                  rows={1}
                />
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Paperclip size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile size={16} />
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
