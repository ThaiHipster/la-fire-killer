
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  isListening?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  isListening = false,
  disabled = false,
  placeholder = "Type your question..."
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleRecordToggle = () => {
    if (isListening && onStopRecording) {
      onStopRecording();
    } else if (onStartRecording) {
      onStartRecording();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="px-4 py-3 border-t bg-background/80 backdrop-blur-sm"
    >
      <div className="flex items-end gap-2 relative">
        <button
          type="button"
          onClick={handleRecordToggle}
          disabled={disabled}
          className={cn(
            "flex-shrink-0 p-2 rounded-full transition-all duration-200",
            isListening 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className={cn("relative", isListening && "mic-wave")}>
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </div>
        </button>
        
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={isListening ? "Listening..." : placeholder}
          className="flex-1 max-h-32 p-3 resize-none rounded-xl border bg-white focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
          rows={1}
        />
        
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={cn(
            "flex-shrink-0 p-2 rounded-full bg-primary text-primary-foreground transition-all duration-200",
            (!message.trim() || disabled) 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-primary/90"
          )}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
