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
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center text-white overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#0a0a0a]">
      {/* Background Video & Cinematic Fallback Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Actual Church Video from YouTube Channel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] h-[350%] sm:w-[160%] sm:h-[160%] pointer-events-none opacity-50 filter contrast-125 brightness-90">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${churchData.latestSermon.videoId}?autoplay=1&mute=1&loop=1&playlist=${churchData.latestSermon.videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&enablejsapi=1`}
            title="UPC Church Bodi Live Worship Background"
            className="w-full h-full object-cover pointer-events-none border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Ambient Poster Layer Underneath */}
        <img
          src={churchData.latestSermon.thumbnail}
          alt="UPC Church Bodi Worship"
          className="absolute inset-0 w-full h-full object-cover -z-10 filter brightness-50"
        />

        {/* Cinematic Multi-layer Gradient Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/90 z-0" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-4 sm:pt-8">
        {/* Small Top Badge */}
        <div className="inline-flex items-center gap-2 bg-[#dd5234]/90 text-white px-3.5 py-1 text-xs font-heading font-bold uppercase tracking-widest mb-5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Welcome to {churchData.name}
        </div>

        {/* Scaled Signature Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[1.02] max-w-3xl drop-shadow-lg mb-5">
          NO ONE SHOULD <br className="hidden sm:inline" />
          <span className="text-[#dd5234]">WALK THROUGH LIFE</span> <br className="hidden sm:inline" />
          ALONE
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-light text-neutral-200 max-w-xl font-sans mb-8 leading-relaxed drop-shadow">
          {churchData.subTagline} Led by <span className="font-semibold text-white">{churchData.pastorName}</span>.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full max-w-md mb-8">
          <button
            onClick={() => onOpenPlanVisit(false)}
            className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-6 py-3.5 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer rounded-none"
          >
            <Calendar className="w-4 h-4" />
            I'm Coming Sunday!
          </button>

          <button
            onClick={() => onOpenPlanVisit(true)}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white px-6 py-3.5 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer rounded-none"
          >
            <Users className="w-4 h-4 text-[#dd5234]" />
            I'm Bringing Kids!
          </button>
        </div>

        {/* Sunday Timings Highlight Banner */}
        <div className="bg-black/55 backdrop-blur-md border border-white/15 px-4 py-2 mb-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-neutral-200">
          <span className="flex items-center gap-1.5 text-[#dd5234] font-heading font-bold uppercase">
            <Clock className="w-3.5 h-3.5" /> Sunday Services:
          </span>
          <span className="font-medium">Early: <strong className="text-white">5:30 AM</strong></span>
          <span className="text-neutral-500">•</span>
          <span className="font-medium">Main: <strong className="text-white">9:00 AM – 12:30 PM</strong></span>
          <span className="text-neutral-500">•</span>
          <span className="font-medium">Kids: <strong className="text-white">10:30 AM</strong></span>
          <span className="text-neutral-500">•</span>
          <span className="font-medium">Youth & Women: <strong className="text-white">1:00 PM</strong></span>
        </div>

        {/* Secondary Quick Info Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-300 border-t border-white/15 pt-5 w-full max-w-2xl">
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 hover:text-[#dd5234] transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#dd5234]" />
            <span className="underline underline-offset-4 font-medium">Bodi Sanctuary Directions</span>
          </button>

          <button
            onClick={onScrollToSermons}
            className="flex items-center gap-1.5 hover:text-[#dd5234] transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#dd5234]" />
            <span className="underline underline-offset-4 font-medium">Watch Latest Message</span>
          </button>
        </div>
      </div>

      {/* Bottom Subtle Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};
