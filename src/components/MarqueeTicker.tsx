import React from 'react';
import { churchData } from '../data/churchData';
import { Sparkles } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [...churchData.marqueeItems, ...churchData.marqueeItems];

  return (
    <div className="relative bg-[#dd5234] text-white py-3 sm:py-3.5 overflow-hidden border-y border-[#b1422a] select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((text, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6">
            <span className="font-heading font-extrabold text-sm sm:text-lg md:text-xl uppercase tracking-wider text-white flex items-center gap-2.5">
              {text}
            </span>
            <Sparkles className="w-4 h-4 ml-4 sm:ml-6 text-white/70 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
