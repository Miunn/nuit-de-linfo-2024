import React from 'react';
import { Sparkles } from 'lucide-react';

interface ItemProps {
  x: number;
  y: number;
  onInteract: () => void;
}

export const Item: React.FC<ItemProps> = ({ x, y, onInteract }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInteract();
  };

  return (
    <div
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 
        transition-all duration-300 hover:scale-110 hover:rotate-12"
      style={{ left: x, top: y }}
      onClick={handleClick}
    >
      <div className="relative group">
        <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 
          bg-yellow-300/20 rounded-full blur-md scale-75 animate-pulse" />
        <div className="absolute -inset-2 bg-yellow-300/10 rounded-full scale-0 
          group-hover:scale-100 transition-transform duration-300" />
      </div>
    </div>
  );
};