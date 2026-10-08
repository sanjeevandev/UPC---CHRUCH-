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
    <section className="py-14 sm:py-20 bg-[#f7f2e7] text-[#303030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-white px-3.5 py-1 shadow-sm inline-block mb-2.5">
            Join Us Every Sunday
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#111111]">
            Gathering Times & Info
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 font-normal">
            Whether you are joining early for prayer or attending our main worship, there is a place for you.
          </p>
        </div>

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Service Times */}
          <div className="bg-white p-6 sm:p-7 shadow-md hover:shadow-xl border-t-4 border-[#dd5234] flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-[#f7f2e7] text-[#dd5234] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-[#111111] mb-2">
                Sunday Schedule
              </h3>
              <p className="text-neutral-600 text-xs mb-4 leading-relaxed">
                Join our life-giving Sunday gatherings and focused prayer sessions.
              </p>

              <div className="space-y-3 pt-2 border-t border-neutral-100">
                {churchData.serviceTimes.map((item, idx) => (
                  <div key={idx} className="flex flex-col pb-2 border-b border-neutral-100/70 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#dd5234] uppercase tracking-wider">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-neutral-100 text-neutral-700 px-2 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-heading font-extrabold text-neutral-900 mt-0.5">
                      {item.time}
                    </span>
                    <span className="text-[11px] text-neutral-500 leading-tight">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100">
              <button
                onClick={onOpenPlanVisit}
                className="w-full bg-[#111111] hover:bg-[#dd5234] text-white py-3 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Attend This Sunday</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Location & Directions */}
          <div className="bg-white p-6 sm:p-7 shadow-md hover:shadow-xl border-t-4 border-[#111111] flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-[#f7f2e7] text-[#111111] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6 text-[#dd5234]" />
              </div>
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-[#111111] mb-2">
                Sanctuary & Campus
              </h3>
              <p className="text-neutral-600 text-xs mb-4 leading-relaxed">
                Convenient campus in Bodi with guest parking and friendly greeting hosts.
              </p>

              <div className="bg-[#f7f2e7] p-4 rounded-none space-y-1.5 mb-4 text-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#dd5234]">
                  Sanctuary Address
                </span>
                <p className="text-sm font-heading font-bold text-neutral-900">
                  {churchData.location.address}
                </p>
                <p className="text-xs text-neutral-600">
                  {churchData.location.cityState}
                </p>
                <p className="text-xs text-neutral-500">
                  {churchData.location.landmark}
                </p>
                <div className="pt-1.5 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{churchData.location.parkingInfo}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-2">
              <button
                onClick={onOpenLocation}
                className="flex-1 bg-[#111111] hover:bg-[#dd5234] text-white py-3 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Campus Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={churchData.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 p-3 flex items-center justify-center transition-colors"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Plan Your Visit */}
          <div className="bg-[#111111] text-white p-6 sm:p-7 shadow-md hover:shadow-xl border-t-4 border-[#dd5234] flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-white/10 text-[#dd5234] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-white mb-2">
                Plan Your Visit
              </h3>
              <p className="text-neutral-300 text-xs mb-4 leading-relaxed">
                Let us know you're coming so our hospitality team can prepare a warm welcome for you!
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234] shrink-0" />
                  <span>Convenient Visitor Parking & Front Porch Welcome</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234] shrink-0" />
                  <span>Children's Class (10:30 AM - 11:50 AM) Check-in</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234] shrink-0" />
                  <span>Free Welcome Gift Packet</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dd5234] shrink-0" />
                  <span>Meet & Greet with Pastor Rajan Joel</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <button
                onClick={onOpenPlanVisit}
                className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-3 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer"
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
