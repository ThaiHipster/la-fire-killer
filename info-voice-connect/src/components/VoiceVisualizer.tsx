
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface VoiceVisualizerProps {
  isActive: boolean;
  className?: string;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ 
  isActive,
  className 
}) => {
  const numberOfBars = 16;
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!isActive) return;
    
    const animateBars = () => {
      barRefs.current.forEach((bar) => {
        if (!bar) return;
        
        const height = Math.floor(Math.random() * 60) + 15;
        bar.style.height = `${height}%`;
      });
    };
    
    const intervalId = setInterval(animateBars, 100);
    return () => clearInterval(intervalId);
  }, [isActive]);
  
  return (
    <div className={cn("flex items-end justify-center h-24 gap-1", className)}>
      {Array.from({ length: numberOfBars }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (barRefs.current[index] = el)}
          className={cn(
            "w-1 bg-primary rounded-t-sm transition-all duration-100 ease-in-out",
            isActive ? "opacity-100" : "opacity-30 h-[10%]"
          )}
          style={{ height: isActive ? '15%' : '10%' }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;
