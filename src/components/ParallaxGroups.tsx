import React, { useState, useEffect, useRef } from 'react';
import { Users, ArrowRight, Check, X } from 'lucide-react';

export const ParallaxGroups: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [joinedGroup, setJoinedGroup] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate how far through the viewport the section is
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const speed = 0.25;
        const offset = (rect.top - windowHeight / 2) * speed;
        setOffsetY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const groups = [
    {
      name: "Men of Valor Fellowship",
      day: "Tuesdays at 7:00 PM",
      location: "Sanctuary Lounge / Cafe",
      description: "Equipping men to lead their homes, workplaces, and spiritual walk with biblical integrity."
    },
    {
      name: "Daughters of Grace (Women's Circle)",
      day: "Thursdays at 6:30 PM",
      location: "Fireside Room & Online",
      description: "Encouraging sisters in Christ through prayer, fellowship, mentorship, and scripture study."
    },
    {
      name: "Coastal Young Adults (18-30)",
      day: "Every Friday at 7:00 PM",
      location: "Coastal Youth Center",
      description: "Dynamic discussions on faith, career, purpose, and vibrant community hangouts."
    },
    {
      name: "Family & Home Prayer Circles",
      day: "Bi-Weekly Wednesdays",
      location: "Neighborhood Host Homes",
      description: "Casual potlucks, family prayer, and discipleship in warm neighborhood environments."
    }
  ];

  return (
    <>
      <section
        id="groups"
        ref={sectionRef}
        className="relative py-20 sm:py-28 text-white overflow-hidden"
      >
        {/* Parallax Background Layer */}
        <div
          className="absolute -top-24 -bottom-24 left-0 right-0 w-full h-[calc(100%+192px)] bg-cover bg-center pointer-events-none transition-transform duration-75 ease-out will-change-transform"
          style={{
            backgroundImage: `url('/connect-groups-bg.svg')`,
            transform: `translateY(${offsetY}px) scale(1.08)`
          }}
        />

        {/* Ambient Dark/Warm Gradient Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-black/70 px-4 py-1.5 border border-[#dd5234]/40 inline-block mb-4 shadow-lg">
            Connect Groups & Community
          </span>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight mb-4 drop-shadow-lg">
            Find Your People. <br />
            <span className="text-[#dd5234]">Grow in Faith.</span> <br />
            Do Life Together.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-light max-w-xl mx-auto mb-8 leading-relaxed drop-shadow">
            Real life happens in circles, not just in rows. Connect with people who will encourage you, pray with you, and stand with you.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-7 py-3.5 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-2xl transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Explore Connect Groups</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Connect Groups Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-[#303030] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#dd5234]">
                Get Connected
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase text-neutral-900">
                Join A Connect Group
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Choose a community circle that fits your schedule and season of life.
              </p>
            </div>

            {joinedGroup && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 mb-6 flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <p className="text-xs sm:text-sm font-medium">
                  Awesome! You've requested to join <strong>{joinedGroup}</strong>. A group leader will reach out to you shortly.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {groups.map((group, idx) => (
                <div key={idx} className="border border-neutral-200 p-5 hover:border-[#dd5234] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="font-heading font-bold text-lg text-neutral-900 uppercase">
                      {group.name}
                    </h4>
                    <span className="text-xs font-bold text-[#dd5234] uppercase tracking-wider">
                      {group.day}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-2">{group.location}</p>
                  <p className="text-xs sm:text-sm text-neutral-700 mb-4">{group.description}</p>
                  <button
                    onClick={() => setJoinedGroup(group.name)}
                    className="bg-neutral-900 hover:bg-[#dd5234] text-white py-2 px-4 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {joinedGroup === group.name ? "Requested ✓" : "Join This Group"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
