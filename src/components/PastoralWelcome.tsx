import React from 'react';
import { churchData } from '../data/churchData';
import { ArrowRight, Quote, Heart, CheckCircle2 } from 'lucide-react';

interface PastoralWelcomeProps {
  onOpenPlanVisit: () => void;
}

export const PastoralWelcome: React.FC<PastoralWelcomeProps> = ({ onOpenPlanVisit }) => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white text-[#303030] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Lead Pastor Photo Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Background Accent Box */}
              <div className="absolute -top-3 -left-3 w-full h-full bg-[#f7f2e7] border-2 border-[#dd5234] -z-10 transform -rotate-1 hidden sm:block" />
              
              {/* Main Image */}
              <div className="relative overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
                  alt={`${churchData.pastorName} - ${churchData.pastorTitle}`}
                  className="w-full h-[380px] sm:h-[450px] object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Overlay Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
                  <p className="text-[11px] uppercase font-heading tracking-widest text-[#dd5234] font-bold">
                    {churchData.pastorTitle}
                  </p>
                  <h4 className="font-heading font-extrabold text-xl uppercase tracking-wide">
                    {churchData.pastorName}
                  </h4>
                  <p className="text-xs text-neutral-300">
                    {churchData.name}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#dd5234] text-white p-3.5 shadow-lg hidden sm:flex items-center gap-2.5">
                <Heart className="w-5 h-5 fill-white" />
                <div className="text-left">
                  <p className="text-[9px] uppercase font-bold tracking-widest leading-tight opacity-90">Every Soul</p>
                  <p className="text-xs font-heading font-extrabold uppercase tracking-wider">Matters To God</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pastor's Letter & Mission */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] mb-2.5">
              <Quote className="w-3.5 h-3.5" />
              A Warm Greeting From Leadership
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#111111] leading-tight mb-5">
              Hi, Welcome To <br />
              <span className="text-[#dd5234]">{churchData.name}!</span>
            </h2>

            <div className="space-y-3.5 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
              <p>
                {churchData.pastorBio}
              </p>
              <p>
                Our mission is to cultivate a <strong>life-giving, Bible-believing, and spirit-empowered community</strong> where every generation finds hope, healing, and genuine belonging.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 pt-3 border-t border-neutral-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-900">Passionate, Spirit-Filled Worship</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-900">Uncompromised Biblical Truth</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-900">Deep, Caring Community Circles</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#dd5234] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-900">Dedicated Kids & Youth Programs</span>
              </div>
            </div>

            {/* Signature & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-3">
              <div>
                <p className="font-serif italic text-xl text-neutral-900 font-bold">
                  {churchData.pastorName}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-neutral-500 font-heading font-semibold">
                  Lead Pastor, {churchData.shortName}
                </p>
              </div>

              <button
                onClick={onOpenPlanVisit}
                className="bg-[#111111] hover:bg-[#dd5234] text-white px-6 py-3 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-200 self-start sm:self-auto cursor-pointer"
              >
                <span>Join Us This Sunday</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
