import React from 'react';
import { Sparkles, Heart, Flame, Shield, Users } from 'lucide-react';

export const SectionDividerRibbon: React.FC = () => {
  const motivationalPhrases = [
    { text: "FAITH THAT MOVES MOUNTAINS", icon: Shield },
    { text: "EMPOWERED BY THE HOLY SPIRIT", icon: Flame },
    { text: "TRANSFORMING LIVES & FAMILIES", icon: Heart },
    { text: "DISCOVER YOUR GOD-GIVEN PURPOSE", icon: Sparkles },
    { text: "A FAMILY OF LOVE & BELONGING", icon: Users },
  ];

  return (
    <div className="relative z-20 bg-[#111111] text-white border-y-4 border-[#dd5234] py-3.5 sm:py-4 overflow-hidden shadow-2xl">
      {/* Decorative Diagonal Stripes Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 20px)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 text-center">
          {motivationalPhrases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="inline-flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-[#dd5234] shrink-0" />
                <span className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-widest text-neutral-100 whitespace-nowrap">
                  {item.text}
                </span>
                {idx < motivationalPhrases.length - 1 && (
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#dd5234] ml-6 sm:ml-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
