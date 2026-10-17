import React from 'react';
import { churchData } from '../data/churchData';
import { ArrowRight } from 'lucide-react';

interface MinistriesSectionProps {
  onOpenPlanVisit: (withKids?: boolean) => void;
}

export const MinistriesSection: React.FC<MinistriesSectionProps> = ({ onOpenPlanVisit }) => {
  return (
    <section id="ministries" className="py-14 sm:py-20 bg-[#f7f2e7] text-[#303030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-white px-3 py-1 shadow-sm inline-block mb-2.5">
            Ministries & Generations
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#111111]">
            A Place For Everyone
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 font-normal">
            From the youngest babies to seasoned adults, there is a vibrant ministry tailored for you.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {churchData.ministries.map((ministry, idx) => (
            <div
              key={idx}
              className="bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group border-b-4 border-[#dd5234]"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] font-heading font-bold uppercase tracking-widest">
                    {ministry.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-neutral-900 mb-2">
                    {ministry.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {ministry.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenPlanVisit(ministry.title.includes("Kids"))}
                  className="w-full bg-[#111111] group-hover:bg-[#dd5234] text-white py-2.5 px-3 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
