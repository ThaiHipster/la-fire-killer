import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import ChatHistory, { ChatMessage } from './ChatHistory';
import ChatInput from './ChatInput';
import VoiceVisualizer from './VoiceVisualizer';
import { cn } from '@/lib/utils';
import { sendChatRequest } from '@/lib/openai';

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content: "Hello, I'm your government information assistant. How can I help you today?",
      type: 'agent',
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = useCallback(async (content: string) => {
    const newUserMessage: ChatMessage = {
      id: uuidv4(),
      content,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsAgentTyping(true);
    
    try {
      // Send the updated messages array to the OpenAI API
      const updatedMessages = [...messages, newUserMessage];
      const response = await sendChatRequest(updatedMessages);
      
      const newAgentMessage: ChatMessage = {
        id: uuidv4(),
        content: response,
        type: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newAgentMessage]);
    } catch (error) {
      console.error('Error getting response from OpenAI:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAgentTyping(false);
    }
  }, [messages, toast]);

  const handleStartRecording = useCallback(() => {
    // In a real implementation, this would use the Web Speech API or another speech recognition library
    setIsListening(true);
    toast({
      title: "Voice recognition started",
      description: "Speak clearly into your microphone.",
    });
    
    // Simulate speech recognition after a delay
    setTimeout(() => {
      handleStopRecording();
      
      const randomQuestions = [
        "What are the requirements for renewing my driver's license?",
        "How do I apply for a small business permit?",
        "When is the deadline for filing income taxes this year?",
        "What documents are needed for a passport application?"
      ];
      
      const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
      handleSendMessage(randomQuestion);
    }, 3000);
  }, [handleSendMessage, toast]);

  const handleStopRecording = useCallback(() => {
    setIsListening(false);
  }, []);

  return (
    <div className={cn("flex flex-col h-full bg-gray-50 border rounded-lg shadow-subtle overflow-hidden", className)}>
      <Header 
        title="Government Information Assistant" 
        subtitle="Ask about public services, policies, and procedures"
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHistory 
          messages={messages} 
          isAgentTyping={isAgentTyping}
        />
        
        {isListening && (
          <div className="bg-white/50 backdrop-blur-sm py-2 px-4 border-t">
            <VoiceVisualizer isActive={isListening} />
          </div>
        )}
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          isListening={isListening}
          disabled={isAgentTyping}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
