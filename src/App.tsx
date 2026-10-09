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
import { PrayerRequestSection } from './components/PrayerRequestSection';
import { Footer } from './components/Footer';
import { PlanVisitModal } from './components/PlanVisitModal';
import { LocationModal } from './components/LocationModal';
import { WhatsAppFloatingHotline } from './components/WhatsAppFloatingHotline';
import { ArrowUp } from 'lucide-react';

export function App() {
  const [planVisitOpen, setPlanVisitOpen] = useState(false);
  const [planWithKids, setPlanWithKids] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <div className="min-h-screen bg-white text-[#303030] flex flex-col font-sans selection:bg-[#dd5234] selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero
        onOpenPlanVisit={handleOpenPlanVisit}
        onOpenLocation={() => setLocationOpen(true)}
        onScrollToSermons={scrollToSermons}
      />

      {/* 3. Live Service Status & Next Sunday Countdown Banner */}
      <ServiceCountdownBanner
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* 4. Infinite Marquee Announcement Ribbon */}
      <MarqueeTicker />

      {/* 5. 3-Column Service Info Cards */}
      <QuickInfoCards
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      {/* 6. Pastoral Welcome & Mission (50/50 Split) */}
      <PastoralWelcome
        onOpenPlanVisit={() => handleOpenPlanVisit(false)}
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

      {/* 12. Prayer Request & Intercession */}
      <PrayerRequestSection />

      {/* 13. Mega Footer */}
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
