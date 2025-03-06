
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import WelcomeBanner from './WelcomeBanner';
import ChatInterface from './ChatInterface';

interface InfoVoiceConnectProps {
  className?: string;
}

const InfoVoiceConnect: React.FC<InfoVoiceConnectProps> = ({ className }) => {
  const [showChat, setShowChat] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGetStarted = () => {
    setShowWelcome(false);
    setTimeout(() => {
      setShowChat(true);
    }, 400);
  };

  return (
    <div className={cn("min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-white to-sky-50", className)}>
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="h-8 w-8 bg-gov-blue rounded flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <path d="M2 9.5V5c0-1.1.9-2 2-2h3.5" />
            <path d="M15 3h3.5c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-16c-1.1 0-2-.9-2-2v-3.5" />
            <path d="M7 14.5v1c0 1.1.9 2 2 2h1" />
            <path d="M14.5 21v-7.5c0-1.1.9-2 2-2h4.5" />
            <path d="M16 3v4.5c0 1.1-.9 2-2 2h-4.5" />
            <path d="M14.5 10v1c0 1.1-.9 2-2 2h-1" />
            <path d="M3 14h3" />
            <path d="M10 7v3" />
            <path d="M7 17h3" />
          </svg>
        </div>
        <span className="font-semibold text-gov-blue">Gov Info Connect</span>
      </div>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {showWelcome && (
          <div className={cn(
            "w-full transition-all duration-500",
            showWelcome ? "animate-fadeIn" : "animate-fadeOut opacity-0"
          )}>
            <WelcomeBanner onGetStarted={handleGetStarted} />
          </div>
        )}
        
        {showChat && (
          <div className={cn(
            "w-full h-[600px] transition-all duration-500",
            showChat ? "animate-fadeIn" : "animate-fadeOut opacity-0"
          )}>
            <ChatInterface />
          </div>
        )}
      </div>
      
      <footer className="mt-auto text-sm text-center text-muted-foreground py-4">
        <p>Official Government Information Service</p>
        <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default InfoVoiceConnect;
