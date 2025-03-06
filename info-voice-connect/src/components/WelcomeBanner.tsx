
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WelcomeBannerProps {
  onGetStarted: () => void;
  className?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ 
  onGetStarted,
  className 
}) => {
  return (
    <div className={cn("glass-panel rounded-xl p-6 text-center max-w-md mx-auto", className)}>
      <div className="mb-6 flex justify-center">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold mb-2">Government Information Portal</h1>
      <p className="text-muted-foreground mb-6">
        Get accurate information about government services, 
        policies, and procedures through our voice-enabled assistant.
      </p>
      
      <button 
        onClick={onGetStarted}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover:bg-primary/90 shadow-subtle hover:shadow-md"
      >
        Get Started
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default WelcomeBanner;
