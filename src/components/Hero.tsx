import React from 'react';
import { churchData } from '../data/churchData';
import { Calendar, Users, Play, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onOpenPlanVisit: (withKids?: boolean) => void;
  onOpenLocation: () => void;
  onScrollToSermons: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPlanVisit,
  onOpenLocation,
  onScrollToSermons,
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center text-white overflow-hidden pt-20 pb-16">
      {/* Background Video & Fallback Poster Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
        >
          <source
            src="https://media.thechurchcoassets.com/accounts/49/d55b27ee-bb9f-4a81-b08e-bd10bb27e1e2-./Website%20-%20Home%20Header%20Video%20NEW%20LOCATION%20UPDATE%20v3.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic Gradient Tint Overlay */}
        <div className="absolute inset-0 bg-black/60 via-black/45 to-black/75" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-8 sm:pt-14">
        {/* Small Top Badge */}
        <div className="inline-flex items-center gap-2 bg-[#dd5234]/90 text-white px-4 py-1 text-xs font-heading font-bold uppercase tracking-widest mb-6 shadow-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Welcome to {churchData.name}
        </div>

        {/* Massive Signature Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95] max-w-4xl drop-shadow-lg mb-6">
          NO ONE SHOULD <br className="hidden sm:inline" />
          <span className="text-[#dd5234]">WALK THROUGH LIFE</span> <br className="hidden sm:inline" />
          ALONE
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl font-light text-neutral-200 max-w-2xl font-sans mb-10 leading-relaxed drop-shadow">
          {churchData.subTagline} Led by <span className="font-semibold text-white">{churchData.pastorName}</span>.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-xl mb-10">
          <button
            onClick={() => onOpenPlanVisit(false)}
            className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm sm:text-base transition-all duration-200 shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer rounded-none"
          >
            <Calendar className="w-5 h-5" />
            I'm Coming Sunday!
          </button>

          <button
            onClick={() => onOpenPlanVisit(true)}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm sm:text-base transition-all duration-200 shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer rounded-none"
          >
            <Users className="w-5 h-5 text-[#dd5234]" />
            I'm Bringing Kids!
          </button>
        </div>

        {/* Sunday Timings Highlight Banner */}
        <div className="bg-black/50 backdrop-blur-md border border-white/15 px-4 py-2.5 mb-8 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-neutral-200">
          <span className="flex items-center gap-1.5 text-[#dd5234] font-heading font-bold uppercase">
            <Clock className="w-4 h-4" /> Sunday Services:
          </span>
          <span className="font-medium">Early: <strong className="text-white">5:30 AM</strong></span>
          <span className="text-neutral-500">•</span>
          <span className="font-medium">Main: <strong className="text-white">9:00 AM – 12:30 PM</strong></span>
          <span className="text-neutral-500">•</span>
          <span className="font-medium">Kids: <strong className="text-white">10:30 AM</strong></span>
          <span className="text-neutral-500">•</span>
          <span className="font-medium">Youth & Women's Prayer: <strong className="text-white">1:00 PM</strong></span>
        </div>

        {/* Secondary Quick Info Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-300 border-t border-white/15 pt-6 w-full max-w-3xl">
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 hover:text-[#dd5234] transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#dd5234]" />
            <span className="underline underline-offset-4 font-medium">Bodi Sanctuary Directions</span>
          </button>

          <button
            onClick={onScrollToSermons}
            className="flex items-center gap-1.5 hover:text-[#dd5234] transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#dd5234]" />
            <span className="underline underline-offset-4 font-medium">Watch Latest Message</span>
          </button>
        </div>
      </div>

      {/* Bottom Subtle Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};
