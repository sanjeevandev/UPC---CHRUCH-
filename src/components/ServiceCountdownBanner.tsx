import React, { useState, useEffect } from 'react';
import { churchData } from '../data/churchData';
import { Clock, Calendar, Radio, Check, Bell, ExternalLink, MapPin } from 'lucide-react';

interface CountdownState {
  isLive: boolean;
  liveServiceName?: string;
  nextServiceName: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  nextDateStr: string;
}

export const ServiceCountdownBanner: React.FC<{
  onOpenPlanVisit: () => void;
  onOpenLocation: () => void;
}> = ({ onOpenPlanVisit, onOpenLocation }) => {
  const [copiedCal, setCopiedCal] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>({
    isLive: false,
    nextServiceName: "Sunday Main Service (9:00 AM)",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    nextDateStr: ""
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      const currentTimeInMins = currentHour * 60 + currentMin;

      // Check if currently Sunday live service
      if (currentDay === 0) {
        // Early Service: 5:30 AM (330m) to 7:00 AM (420m)
        if (currentTimeInMins >= 330 && currentTimeInMins <= 420) {
          setCountdown({
            isLive: true,
            liveServiceName: "Early Dawn Prayer & Service (5:30 AM – 7:00 AM)",
            nextServiceName: "Main Service at 9:00 AM",
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            nextDateStr: "Happening Now"
          });
          return;
        }
        // Main Service: 9:00 AM (540m) to 12:30 PM (750m)
        if (currentTimeInMins >= 540 && currentTimeInMins <= 750) {
          setCountdown({
            isLive: true,
            liveServiceName: "Main Morning Worship Service (9:00 AM – 12:30 PM)",
            nextServiceName: "Youth & Women's Prayer at 1:00 PM",
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            nextDateStr: "Happening Now"
          });
          return;
        }
        // Youth / Women: 1:00 PM (780m) to 2:00 PM (840m)
        if (currentTimeInMins >= 780 && currentTimeInMins <= 840) {
          setCountdown({
            isLive: true,
            liveServiceName: "Youth & Women's Prayer Fellowship (1:00 PM – 2:00 PM)",
            nextServiceName: "Next Sunday 5:30 AM Dawn Service",
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            nextDateStr: "Happening Now"
          });
          return;
        }
      }

      // Calculate time to next Sunday 9:00 AM service
      const nextSunday = new Date(now);
      let daysUntilSunday = (7 - currentDay) % 7;
      if (daysUntilSunday === 0 && currentTimeInMins > 540) {
        daysUntilSunday = 7;
      }
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      const diffMs = nextSunday.getTime() - now.getTime();
      const diffSecs = Math.max(0, Math.floor(diffMs / 1000));

      const days = Math.floor(diffSecs / (3600 * 24));
      const hours = Math.floor((diffSecs % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffSecs % 3600) / 60);
      const seconds = diffSecs % 60;

      const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      const nextDateStr = nextSunday.toLocaleDateString('en-US', dateOptions);

      setCountdown({
        isLive: false,
        nextServiceName: "Sunday Main Morning Service",
        days,
        hours,
        minutes,
        seconds,
        nextDateStr: `Sunday, 9:00 AM (${nextDateStr})`
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate Google Calendar Link
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("UPC Bodi Sunday Worship Service");
    const details = encodeURIComponent("Join Pastor Rajan Joel & the United Pentecostal Church family in Bodi for spirit-filled worship, praise, and powerful preaching.");
    const location = encodeURIComponent(churchData.location.address + ", Bodinayakanur");
    
    // Google Calendar URL template for recurring or upcoming Sunday
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&recur=RRULE:FREQ=WEEKLY;BYDAY=SU`;
    window.open(googleCalUrl, '_blank');
    setCopiedCal(true);
    setTimeout(() => setCopiedCal(false), 3000);
  };

  return (
    <section className="relative z-20 bg-[#141414] text-white border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Status Label & Service Title */}
          <div className="flex items-center gap-3.5 text-center lg:text-left">
            <div className="relative flex-shrink-0">
              {countdown.isLive ? (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600/20 border border-red-500 text-red-500">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#dd5234]/15 border border-[#dd5234]/40 text-[#dd5234]">
                  <Clock className="w-5 h-5" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                {countdown.isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-600 text-white font-heading font-bold text-[10px] tracking-wider uppercase animate-pulse">
                    ● Service Live Now
                  </span>
                ) : (
                  <span className="text-[11px] font-heading font-bold tracking-widest text-[#dd5234] uppercase">
                    Upcoming Worship Gathering
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-heading font-bold uppercase tracking-tight text-neutral-100">
                {countdown.isLive ? countdown.liveServiceName : countdown.nextServiceName}
              </h3>
              {!countdown.isLive && (
                <p className="text-xs text-neutral-400">
                  {countdown.nextDateStr} • Early Dawn 5:30 AM & Main Service 9:00 AM
                </p>
              )}
            </div>
          </div>

          {/* Center: Live indicator OR Countdown Timer Digits */}
          {countdown.isLive ? (
            <div className="flex items-center gap-3 bg-red-950/40 border border-red-800/60 px-5 py-2.5 rounded-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-red-200">
                You are warmly invited to join in person at Bodi Sanctuary!
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 font-heading">
              <div className="flex flex-col items-center bg-[#1f1f1f] border border-neutral-800 px-3 py-1.5 min-w-[58px]">
                <span className="text-lg sm:text-xl font-extrabold text-white leading-none">
                  {String(countdown.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">Days</span>
              </div>
              <span className="text-neutral-600 font-bold text-lg">:</span>

              <div className="flex flex-col items-center bg-[#1f1f1f] border border-neutral-800 px-3 py-1.5 min-w-[58px]">
                <span className="text-lg sm:text-xl font-extrabold text-white leading-none">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">Hours</span>
              </div>
              <span className="text-neutral-600 font-bold text-lg">:</span>

              <div className="flex flex-col items-center bg-[#1f1f1f] border border-neutral-800 px-3 py-1.5 min-w-[58px]">
                <span className="text-lg sm:text-xl font-extrabold text-[#dd5234] leading-none">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">Mins</span>
              </div>
              <span className="text-neutral-600 font-bold text-lg">:</span>

              <div className="flex flex-col items-center bg-[#1f1f1f] border border-neutral-800 px-3 py-1.5 min-w-[58px]">
                <span className="text-lg sm:text-xl font-extrabold text-[#dd5234] leading-none">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">Secs</span>
              </div>
            </div>
          )}

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-center">
            {countdown.isLive ? (
              <>
                <a
                  href={churchData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Watch YouTube Live
                </a>
                <button
                  onClick={onOpenLocation}
                  className="border border-neutral-700 hover:border-white text-white px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#dd5234]" /> Directions
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAddToCalendar}
                  className="bg-[#242424] hover:bg-[#303030] border border-neutral-700 hover:border-[#dd5234] text-neutral-200 hover:text-white px-3.5 py-2 text-xs font-heading font-medium tracking-wide transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  title="Add Sunday Service to Google Calendar"
                >
                  {copiedCal ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Calendar className="w-3.5 h-3.5 text-[#dd5234]" />}
                  {copiedCal ? "Opening Calendar..." : "Add to Calendar"}
                </button>

                <button
                  onClick={onOpenPlanVisit}
                  className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" /> Plan Visit
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
