import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCountdownBanner } from './components/ServiceCountdownBanner';
import { MarqueeTicker } from './components/MarqueeTicker';
import { QuickInfoCards } from './components/QuickInfoCards';
import { PastoralWelcome } from './components/PastoralWelcome';
import { ParallaxGroups } from './components/ParallaxGroups';
import { LatestSermon } from './components/LatestSermon';
import { DailyPromiseSection } from './components/DailyPromiseSection';
import { SectionDividerRibbon } from './components/SectionDividerRibbon';
import { MinistriesSection } from './components/MinistriesSection';
import { YouthLeaderSection } from './components/YouthLeaderSection';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';
import { PrayerRequestSection } from './components/PrayerRequestSection';
import { Footer } from './components/Footer';
import { PlanVisitModal } from './components/PlanVisitModal';
import { LocationModal } from './components/LocationModal';
import { PastorSecretPinModal } from './components/PastorSecretPinModal';
import { LiveEditToolbar } from './components/LiveEditToolbar';
import { WhatsAppFloatingHotline } from './components/WhatsAppFloatingHotline';
import { type ChurchEvent, getSavedEvents, saveEvents } from './data/eventsData';
import { ArrowUp } from 'lucide-react';

export function App() {
  const [planVisitOpen, setPlanVisitOpen] = useState(false);
  const [planWithKids, setPlanWithKids] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Stealth Pastor Live Edit States
  const [events, setEvents] = useState<ChurchEvent[]>(getSavedEvents);
  const [secretAuthOpen, setSecretAuthOpen] = useState(false);
  const [isLiveEditMode, setIsLiveEditMode] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleOpenPlanVisit = (withKids: boolean = false) => {
    setPlanWithKids(withKids);
    setPlanVisitOpen(true);
  };

  const scrollToSermons = () => {
    const el = document.getElementById('sermons');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live Edit Operations
  const handleUpdateEvent = (id: string, field: keyof ChurchEvent, val: any) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleAddNewEvent = () => {
    const newEvt: ChurchEvent = {
      id: `evt-${Date.now()}`,
      title: "Special Church Gathering",
      category: "Special Gathering",
      date: "Sunday, Coming Date",
      time: "6:00 PM – 8:30 PM",
      location: "UPC Main Sanctuary, Bodi",
      description: "Join us for an anointed service of praise, worship, and dynamic ministry of God's Word.",
      speakerOrLead: "Pastor Rajan Joel",
      featured: true
    };
    setEvents(prev => [newEvt, ...prev]);
  };

  const handleSaveAndExit = () => {
    saveEvents(events);
    setIsLiveEditMode(false);
  };

  const handleCancelLiveEdit = () => {
    setEvents(getSavedEvents());
    setIsLiveEditMode(false);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white selection:bg-[#dd5234] selection:text-white">
      {/* 1. Global Navigation Bar (Triple-tap logo triggers secret Pastor auth) */}
      <Navbar
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onOpenLocation={() => setLocationOpen(true)}
        onTriggerSecretAuth={() => setSecretAuthOpen(true)}
      />

      {/* 2. Hero Section with Video/Atmosphere & CTAs */}
      <Hero
        onOpenPlanVisit={handleOpenPlanVisit}
        onOpenLocation={() => setLocationOpen(true)}
        onScrollToSermons={scrollToSermons}
      />

      {/* 3. Live Service Indicator & Sunday Countdown Banner */}
      <ServiceCountdownBanner
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* 4. Marquee Announcement Ticker */}
      <MarqueeTicker />

      {/* 5. Quick Info Cards (Schedule, Campus & Visit Prep) */}
      <QuickInfoCards
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* 6. Pastoral Welcome & Mission (Long press Pastor photo triggers secret auth) */}
      <PastoralWelcome
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onTriggerSecretAuth={() => setSecretAuthOpen(true)}
      />

      {/* 7. Parallax Connect Groups Banner */}
      <ParallaxGroups />

      {/* 8. Latest Message & Preaching Media Player */}
      <LatestSermon />

      {/* 9. Daily Promise of the Day (Bilingual Tamil & English) */}
      <DailyPromiseSection />

      {/* Motivational Divider Ribbon */}
      <SectionDividerRibbon />

      {/* 10. Ministries (Kids, Youth, Worship, Community - A Place For Everyone) */}
      <MinistriesSection
        onOpenPlanVisit={handleOpenPlanVisit}
      />

      {/* 11. Youth Leadership (Bro. Goodwin & UPC Bodi Youth) */}
      <YouthLeaderSection
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
      />

      {/* 12. Upcoming Events & Special Services (With Live Edit Mode) */}
      <UpcomingEventsSection
        isLiveEditMode={isLiveEditMode}
        events={events}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        onAddNewEvent={handleAddNewEvent}
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
      />

      {/* 13. Prayer Request & Intercession */}
      <PrayerRequestSection />

      {/* 14. Mega Footer (Clean with zero admin traces) */}
      <Footer
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* Interactive Modals */}
      <PlanVisitModal
        isOpen={planVisitOpen}
        onClose={() => setPlanVisitOpen(false)}
        initialWithKids={planWithKids}
      />

      <LocationModal
        isOpen={locationOpen}
        onClose={() => setLocationOpen(false)}
      />

      {/* Stealth Pastor PIN Verification Modal */}
      <PastorSecretPinModal
        isOpen={secretAuthOpen}
        onClose={() => setSecretAuthOpen(false)}
        onSuccess={() => {
          setIsLiveEditMode(true);
          const el = document.getElementById('events');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Toolbar when Live Edit Mode is Active */}
      {isLiveEditMode && (
        <LiveEditToolbar
          onAddEvent={handleAddNewEvent}
          onSaveAndExit={handleSaveAndExit}
          onCancel={handleCancelLiveEdit}
        />
      )}

      {/* Floating WhatsApp Prayer & Help Hotline */}
      <WhatsAppFloatingHotline />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-[#111111] hover:bg-[#dd5234] text-white w-12 h-12 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default App;
