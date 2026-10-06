import React from 'react';
import { churchData } from '../data/churchData';
import { ArrowRight } from 'lucide-react';

interface MinistriesSectionProps {
  onOpenPlanVisit: (withKids?: boolean) => void;
}

export const MinistriesSection: React.FC<MinistriesSectionProps> = ({ onOpenPlanVisit }) => {
  return (
    <section id="ministries" className="py-20 sm:py-28 bg-[#f7f2e7] text-[#303030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-white px-3.5 py-1.5 shadow-sm inline-block mb-3">
            Ministries & Generations
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#111111]">
            A Place For Everyone
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-normal">
            From the youngest babies to seasoned adults, there is a vibrant ministry tailored for you.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {churchData.ministries.map((ministry, idx) => (
            <div
              key={idx}
              className="bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group border-b-4 border-[#dd5234]"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-widest">
                    {ministry.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-neutral-900 mb-2.5">
                    {ministry.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {ministry.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenPlanVisit(ministry.title.includes("Kids"))}
                  className="w-full bg-[#111111] group-hover:bg-[#dd5234] text-white py-2.5 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
