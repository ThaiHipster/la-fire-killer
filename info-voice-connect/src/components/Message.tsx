
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import TypeWriter from './TypeWriter';

export type MessageType = 'user' | 'agent';

interface MessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
  isTyping?: boolean;
  className?: string;
}

const Message: React.FC<MessageProps> = ({
  content,
  type,
  timestamp,
  isTyping = false,
  className,
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(timestamp);

  return (
    <div 
      className={cn(
        'group mb-4 flex flex-col',
        type === 'user' ? 'items-end' : 'items-start',
        className
      )}
      onClick={() => setShowTimestamp(!showTimestamp)}
    >
      <div
        className={cn(
          'relative rounded-2xl px-4 py-2.5 border',
          type === 'user' 
            ? 'bg-primary text-primary-foreground border-primary/20 rounded-tr-none' 
            : 'bg-secondary text-secondary-foreground border-secondary/60 rounded-tl-none'
        )}
      >
        {isTyping ? (
          <div className="typing-indicator py-1 px-2">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        ) : (
          <TypeWriter text={content} delay={type === 'agent' ? 15 : 1} />
        )}
        
        <div 
          className={cn(
            'absolute text-xs text-muted-foreground opacity-0 transition-opacity duration-200',
            showTimestamp && 'opacity-100',
            type === 'user' ? '-bottom-5 right-1' : '-bottom-5 left-1'
          )}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
