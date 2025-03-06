
import React, { useRef, useEffect } from 'react';
import Message, { MessageType } from './Message';

export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  isAgentTyping?: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  messages,
  isAgentTyping = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAgentTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          type={message.type}
          timestamp={message.timestamp}
        />
      ))}
      
      {isAgentTyping && (
        <Message
          content=""
          type="agent"
          timestamp={new Date()}
          isTyping={true}
        />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatHistory;
