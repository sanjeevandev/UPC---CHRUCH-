import React from 'react';
import { churchData } from '../data/churchData';
import { Clock, MapPin, CalendarCheck, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface QuickInfoCardsProps {
  onOpenPlanVisit: () => void;
  onOpenLocation: () => void;
}

export const QuickInfoCards: React.FC<QuickInfoCardsProps> = ({
  onOpenPlanVisit,
  onOpenLocation,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#f7f2e7] text-[#303030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-white px-3.5 py-1.5 shadow-sm inline-block mb-3">
            Join Us This Week
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#111111]">
            Everything You Need To Know
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-normal">
            Whether it's your first time or you're looking for a church family, you're always invited.
          </p>
        </div>

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Service Times */}
          <div className="bg-white p-8 sm:p-10 shadow-lg border-t-4 border-[#dd5234] flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="w-14 h-14 bg-[#f7f2e7] text-[#dd5234] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-[#111111] mb-3">
                Service Times
              </h3>
              <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                Join our uplifting Sunday gathering and weekly life-giving prayer sessions.
              </p>

              <div className="space-y-4 pt-2 border-t border-neutral-100">
                {churchData.serviceTimes.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xs font-bold text-[#dd5234] uppercase tracking-wider">
                      {item.day}
                    </span>
                    <span className="text-lg font-heading font-bold text-neutral-900">
                      {item.time}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <button
                onClick={onOpenPlanVisit}
                className="w-full bg-[#111111] hover:bg-[#dd5234] text-white py-3.5 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Attend This Sunday</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Location & Directions */}
          <div className="bg-white p-8 sm:p-10 shadow-lg border-t-4 border-[#111111] flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="w-14 h-14 bg-[#f7f2e7] text-[#111111] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-[#dd5234]" />
              </div>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-[#111111] mb-3">
                Location & Parking
              </h3>
              <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                Convenient campus with hassle-free guest parking and warm door hosts.
              </p>

              <div className="bg-[#f7f2e7] p-5 rounded-none space-y-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#dd5234]">
                  Sanctuary Address
                </span>
                <p className="text-base font-heading font-bold text-neutral-900">
                  {churchData.location.address}
                </p>
                <p className="text-xs text-neutral-600">
                  {churchData.location.landmark}
                </p>
                <div className="pt-2 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{churchData.location.parkingInfo}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row gap-2">
              <button
                onClick={onOpenLocation}
                className="flex-1 bg-[#111111] hover:bg-[#dd5234] text-white py-3.5 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Campus Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={churchData.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 p-3.5 flex items-center justify-center transition-colors"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Plan Your Visit */}
          <div className="bg-[#111111] text-white p-8 sm:p-10 shadow-lg border-t-4 border-[#dd5234] flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="w-14 h-14 bg-white/10 text-[#dd5234] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-white mb-3">
                Plan Your Visit
              </h3>
              <p className="text-neutral-300 text-sm mb-6 leading-relaxed">
                Let us know you're coming so our host team can roll out the VIP welcome for you!
              </p>

              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234]" />
                  <span>Reserved VIP Parking & Guided Tour</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234]" />
                  <span>Pre-registered, secure Kids Check-in</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234]" />
                  <span>Free Welcome Gift & Hot Coffee</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234]" />
                  <span>Meet & Greet with Pastor Rajan Joel</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800">
              <button
                onClick={onOpenPlanVisit}
                className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-3.5 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>Pre-Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
