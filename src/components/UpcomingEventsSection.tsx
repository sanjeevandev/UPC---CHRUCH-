import React, { useState } from 'react';
import { type ChurchEvent } from '../data/eventsData';
import { churchData } from '../data/churchData';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  MessageCircle,
  CalendarPlus,
  ChevronRight,
  Trash2,
  Plus,
  Edit3
} from 'lucide-react';

interface UpcomingEventsSectionProps {
  onOpenPlanVisit: () => void;
  isLiveEditMode?: boolean;
  events: ChurchEvent[];
  onUpdateEvent?: (id: string, field: keyof ChurchEvent, value: any) => void;
  onDeleteEvent?: (id: string) => void;
  onAddNewEvent?: () => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  onOpenPlanVisit,
  isLiveEditMode = false,
  events,
  onUpdateEvent,
  onDeleteEvent,
  onAddNewEvent,
}) => {
  const [filter, setFilter] = useState<string>('All');

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
        
        {/* Live Edit Mode Announcement Banner */}
        {isLiveEditMode && (
          <div className="mb-6 p-4 bg-amber-500/10 border-2 border-amber-500 text-amber-900 flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-amber-600 animate-pulse shrink-0" />
              <div>
                <p className="font-heading font-extrabold text-sm uppercase tracking-wider text-amber-800">
                  Pastor Stealth Edit Mode Active
                </p>
                <p className="text-xs text-amber-700">
                  Type directly into any text box below to change titles, dates, or details. Click "Save & Lock" in the bottom bar when done.
                </p>
              </div>
            </div>
            {onAddNewEvent && (
              <button
                onClick={onAddNewEvent}
                className="bg-[#111111] hover:bg-[#dd5234] text-white px-3.5 py-2 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Event</span>
              </button>
            )}
          </div>
        )}

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
                className={`bg-[#f7f2e7] border-t-4 border-[#dd5234] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                  isLiveEditMode ? 'ring-2 ring-amber-400 bg-amber-50/40' : ''
                }`}
              >
                <div>
                  {/* Top Badges & Edit Controls */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {isLiveEditMode ? (
                      <select
                        value={evt.category}
                        onChange={(e) => onUpdateEvent?.(evt.id, 'category', e.target.value)}
                        className="text-[10px] font-heading font-bold uppercase tracking-widest bg-white border border-[#dd5234] px-2 py-0.5 text-[#dd5234] focus:outline-none"
                      >
                        <option value="Special Gathering">Special Gathering</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Youth Night">Youth Night</option>
                        <option value="Fasting & Prayer">Fasting & Prayer</option>
                        <option value="Worship Concert">Worship Concert</option>
                        <option value="Sunday Service">Sunday Service</option>
                      </select>
                    ) : (
                      <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-white text-[#dd5234] px-2.5 py-1 border border-[#dd5234]/30 shadow-xs">
                        {evt.category}
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {isLiveEditMode && (
                        <label className="flex items-center gap-1 text-[10px] font-bold text-neutral-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!evt.featured}
                            onChange={(e) => onUpdateEvent?.(evt.id, 'featured', e.target.checked)}
                            className="rounded accent-[#dd5234]"
                          />
                          <span>Star</span>
                        </label>
                      )}

                      {!isLiveEditMode && evt.featured && (
                        <span className="text-[10px] font-heading font-bold uppercase tracking-widest bg-[#111111] text-amber-300 px-2.5 py-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Featured</span>
                        </span>
                      )}

                      {isLiveEditMode && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete event "${evt.title}"?`)) {
                              onDeleteEvent?.(evt.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-xs transition-colors cursor-pointer"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title (Editable in Live Mode) */}
                  {isLiveEditMode ? (
                    <div className="mb-3">
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-0.5">Title</label>
                      <input
                        type="text"
                        value={evt.title}
                        onChange={(e) => onUpdateEvent?.(evt.id, 'title', e.target.value)}
                        className="w-full font-heading font-bold text-lg uppercase bg-white border border-amber-400 p-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#dd5234]"
                      />
                    </div>
                  ) : (
                    <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-[#111111] group-hover:text-[#dd5234] transition-colors mb-3">
                      {evt.title}
                    </h3>
                  )}

                  {/* Date, Time & Location Meta */}
                  <div className="space-y-2 text-xs text-neutral-700 bg-white p-3.5 mb-3.5 border border-neutral-200/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#dd5234] shrink-0" />
                      {isLiveEditMode ? (
                        <input
                          type="text"
                          value={evt.date}
                          placeholder="Event Date"
                          onChange={(e) => onUpdateEvent?.(evt.id, 'date', e.target.value)}
                          className="flex-1 text-xs font-bold text-neutral-900 border border-neutral-300 px-1.5 py-1 focus:border-[#dd5234]"
                        />
                      ) : (
                        <span className="font-bold text-neutral-900">{evt.date}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      {isLiveEditMode ? (
                        <input
                          type="text"
                          value={evt.time}
                          placeholder="Event Time"
                          onChange={(e) => onUpdateEvent?.(evt.id, 'time', e.target.value)}
                          className="flex-1 text-xs text-neutral-700 border border-neutral-300 px-1.5 py-1 focus:border-[#dd5234]"
                        />
                      ) : (
                        <span>{evt.time}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-[#dd5234] shrink-0" />
                      {isLiveEditMode ? (
                        <input
                          type="text"
                          value={evt.location}
                          placeholder="Venue / Campus"
                          onChange={(e) => onUpdateEvent?.(evt.id, 'location', e.target.value)}
                          className="flex-1 text-xs text-neutral-600 border border-neutral-300 px-1.5 py-1 focus:border-[#dd5234]"
                        />
                      ) : (
                        <span className="truncate">{evt.location}</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {isLiveEditMode ? (
                    <div className="mb-4">
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={evt.description}
                        onChange={(e) => onUpdateEvent?.(evt.id, 'description', e.target.value)}
                        className="w-full text-xs text-neutral-800 bg-white border border-neutral-300 p-2 focus:border-[#dd5234]"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {evt.description}
                    </p>
                  )}

                  {/* Minister / Lead Tag */}
                  {isLiveEditMode ? (
                    <div className="mb-2">
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-0.5">Leader / Speaker</label>
                      <input
                        type="text"
                        value={evt.speakerOrLead || ''}
                        placeholder="e.g. Pastor Rajan Joel"
                        onChange={(e) => onUpdateEvent?.(evt.id, 'speakerOrLead', e.target.value)}
                        className="w-full text-xs text-neutral-700 border border-neutral-300 px-1.5 py-1 focus:border-[#dd5234]"
                      />
                    </div>
                  ) : (
                    evt.speakerOrLead && (
                      <div className="text-[11px] text-neutral-500 pb-2">
                        <span>Led by: </span>
                        <strong className="text-neutral-800">{evt.speakerOrLead}</strong>
                      </div>
                    )
                  )}
                </div>

                {/* Card Actions (Only in regular visitor mode) */}
                {!isLiveEditMode && (
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
                )}
              </div>
            ))}

            {/* In Live Edit Mode: Add New Card Trigger */}
            {isLiveEditMode && onAddNewEvent && (
              <button
                onClick={onAddNewEvent}
                className="bg-white border-2 border-dashed border-[#dd5234] hover:bg-[#f7f2e7] p-8 min-h-[300px] flex flex-col items-center justify-center text-center transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-[#f7f2e7] group-hover:bg-[#dd5234] group-hover:text-white text-[#dd5234] rounded-full flex items-center justify-center mb-3 transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-neutral-900 group-hover:text-[#dd5234] transition-colors">
                  Add New Church Event
                </h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-[200px]">
                  Click to drop a new editable card onto the website
                </p>
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
