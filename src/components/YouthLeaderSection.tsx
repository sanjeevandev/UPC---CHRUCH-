import React from 'react';
import { churchData } from '../data/churchData';
import { ArrowRight, Sparkles, Flame, CheckCircle2, Clock } from 'lucide-react';

interface YouthLeaderSectionProps {
  onOpenPlanVisit: () => void;
}

export const YouthLeaderSection: React.FC<YouthLeaderSectionProps> = ({ onOpenPlanVisit }) => {
  return (
    <section id="youth" className="py-14 sm:py-20 bg-[#111111] text-white overflow-hidden border-t border-neutral-800 border-b-4 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Letter & Youth Mission */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              Youth Leadership & Next Generation
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight mb-3">
              Raising Leaders. <br />
              <span className="text-[#dd5234]">Igniting Revival In Youth.</span>
            </h2>

            {/* Gathering Time Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-neutral-200 px-3.5 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider mb-5 border border-white/15 w-fit">
              <Clock className="w-3.5 h-3.5 text-[#dd5234]" />
              <span>Youth Fellowship & Prayer: <strong className="text-white font-bold">{churchData.youthLeader.gatheringTime}</strong></span>
            </div>

            <div className="space-y-3.5 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              <p>
                {churchData.youthLeader.bio}
              </p>
              <p>
                Whether you are in school, college, or starting your career, <strong>UPC Bodi Youth</strong> is where you will find spiritual family, guidance, and a place to thrive.
              </p>
            </div>

            {/* Youth Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 pt-3 border-t border-neutral-800">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-200">Focused Youth Prayer & Intercession</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-200">Relevant Biblical Truth & Mentorship</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-200">Passionate, Energetic Worship</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-200">Creative Talents & Community Impact</span>
              </div>
            </div>

            {/* Signature & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-3">
              <div>
                <p className="font-serif italic text-xl text-white font-bold">
                  {churchData.youthLeader.name}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-heading font-semibold">
                  {churchData.youthLeader.title}, {churchData.shortName} Bodi
                </p>
              </div>

              <button
                onClick={onOpenPlanVisit}
                className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-6 py-3 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-200 self-start sm:self-auto cursor-pointer shadow-xl"
              >
                <span>Connect With UPC Youth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Youth Leader Photo Frame */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Background Accent Box */}
              <div className="absolute -top-3 -right-3 w-full h-full bg-[#1e1e1e] border-2 border-[#dd5234] -z-10 transform rotate-1 hidden sm:block" />
              
              {/* Main Image */}
              <div className="relative overflow-hidden shadow-2xl border border-neutral-800">
                <img
                  src={churchData.youthLeader.image}
                  alt={`${churchData.youthLeader.name} - ${churchData.youthLeader.title}`}
                  className="w-full h-[380px] sm:h-[450px] object-cover object-top filter contrast-105 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Overlay Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 text-white">
                  <p className="text-[11px] uppercase font-heading tracking-widest text-[#dd5234] font-bold">
                    {churchData.youthLeader.title}
                  </p>
                  <h4 className="font-heading font-extrabold text-xl uppercase tracking-wide">
                    {churchData.youthLeader.name}
                  </h4>
                  <p className="text-xs text-neutral-300">
                    UPC Bodi Youth Ministry
                  </p>
                </div>
              </div>

              {/* Decorative Corner Badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#dd5234] text-white p-3.5 shadow-lg hidden sm:flex items-center gap-2.5">
                <Flame className="w-5 h-5 fill-white" />
                <div className="text-left">
                  <p className="text-[9px] uppercase font-bold tracking-widest leading-tight opacity-90">Next Generation</p>
                  <p className="text-xs font-heading font-extrabold uppercase tracking-wider">Bold & Spirit-Led</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
