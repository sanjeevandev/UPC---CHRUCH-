import React from 'react';
import { churchData } from '../data/churchData';
import { Sparkles } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [...churchData.marqueeItems, ...churchData.marqueeItems];

  return (
    <div className="relative bg-[#dd5234] text-white py-4 sm:py-5 overflow-hidden border-y border-[#b1422a] select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((text, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-8">
            <span className="font-heading font-extrabold text-lg sm:text-2xl md:text-3xl uppercase tracking-wider text-white flex items-center gap-3">
              {text}
            </span>
            <Sparkles className="w-5 h-5 ml-6 sm:ml-10 text-white/70 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
