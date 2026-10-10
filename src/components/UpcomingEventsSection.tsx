import React, { useState, useEffect } from 'react';
import { type ChurchEvent, getSavedEvents } from '../data/eventsData';
import { churchData } from '../data/churchData';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  MessageCircle,
  CalendarPlus,
  ChevronRight
} from 'lucide-react';

interface UpcomingEventsSectionProps {
  onOpenPlanVisit: () => void;
  onOpenAdminPortal?: () => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  onOpenPlanVisit,
}) => {
  const [events, setEvents] = useState<ChurchEvent[]>(getSavedEvents);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const handleUpdate = () => {
      setEvents(getSavedEvents());
    };
    window.addEventListener('upc_events_changed', handleUpdate);
    return () => {
      window.removeEventListener('upc_events_changed', handleUpdate);
    };
  }, []);

  const categories = ['All', 'Celebration', 'Youth Night', 'Fasting & Prayer', 'Special Gathering'];

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(e => e.category === filter);

  // Helper to open WhatsApp for event RSVP
  const handleRSVPWhatsApp = (evt: ChurchEvent) => {
    const msg = `Praise the Lord Pastor Rajan Joel & UPC Team 🙏\n\n*INQUIRY / RSVP FOR UPCOMING EVENT:*\n• *Event:* ${evt.title}\n• *Date:* ${evt.date}\n• *Time:* ${evt.time}\n• *Campus:* ${evt.location}\n\nI would like to attend this gathering. Please share further details.`;
    const url = `https://api.whatsapp.com/send?phone=${churchData.socials.whatsappNumber}&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Helper to create a Google Calendar Link
  const handleAddToCalendar = (evt: ChurchEvent) => {
    const title = encodeURIComponent(`UPC Bodi: ${evt.title}`);
    const details = encodeURIComponent(`${evt.description}\n\nVenue: ${evt.location}\nMinister: ${evt.speakerOrLead || 'Pastor Rajan Joel'}\nContact: ${churchData.socials.phone}`);
    const location = encodeURIComponent(evt.location);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <section id="events" className="py-14 sm:py-20 bg-white text-[#303030] relative border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-200 gap-6">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-[#f7f2e7] px-3.5 py-1 inline-block mb-2.5">
              Mark Your Calendar
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#111111]">
              Upcoming Events & Special Gatherings
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
              Stay connected with our spirit-filled revival nights, harvest celebrations, youth rallies, and special church services in Bodi.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#dd5234] text-white shadow-sm'
                  : 'bg-[#f7f2e7] text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-[#f7f2e7] border-2 border-dashed border-neutral-300">
            <Calendar className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="font-heading font-bold text-base text-neutral-800 uppercase">
              No events in this category right now
            </p>
            <p className="text-xs text-neutral-600 mt-1">
              Check back soon or explore our weekly Sunday services!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#f7f2e7] border-t-4 border-[#dd5234] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-white text-[#dd5234] px-2.5 py-1 border border-[#dd5234]/30 shadow-xs">
                      {evt.category}
                    </span>
                    {evt.featured && (
                      <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-[#111111] text-amber-300 px-2.5 py-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-[#111111] group-hover:text-[#dd5234] transition-colors mb-3">
                    {evt.title}
                  </h3>

                  {/* Date, Time & Location Meta */}
                  <div className="space-y-1.5 text-xs text-neutral-700 bg-white p-3.5 mb-3.5 border border-neutral-200/80">
                    <div className="flex items-center gap-2 font-bold text-neutral-900">
                      <Calendar className="w-3.5 h-3.5 text-[#dd5234] shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-[#dd5234] shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  {/* Minister / Lead Tag */}
                  {evt.speakerOrLead && (
                    <div className="text-[11px] text-neutral-500 pb-2">
                      <span>Led by: </span>
                      <strong className="text-neutral-800">{evt.speakerOrLead}</strong>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-neutral-300/70 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRSVPWhatsApp(evt)}
                      className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 font-heading font-bold uppercase tracking-wider text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>RSVP on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleAddToCalendar(evt)}
                      className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 p-2.5 flex items-center justify-center transition-colors cursor-pointer"
                      title="Add to Google Calendar"
                    >
                      <CalendarPlus className="w-4 h-4 text-[#dd5234]" />
                    </button>
                  </div>

                  <button
                    onClick={onOpenPlanVisit}
                    className="w-full text-center text-[11px] font-heading font-bold uppercase tracking-wider text-neutral-700 hover:text-[#dd5234] py-1 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Plan Sunday Visit</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
