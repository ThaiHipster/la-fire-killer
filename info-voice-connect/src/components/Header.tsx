
import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle,
  className 
}) => {
  return (
    <header className={cn("px-6 py-4 border-b bg-white/80 backdrop-blur-sm flex items-center justify-between", className)}>
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      
      <button className="p-2 rounded-full hover:bg-secondary transition-colors">
        <Info size={20} className="text-muted-foreground" />
      </button>
    </header>
  );
};

export default Header;
