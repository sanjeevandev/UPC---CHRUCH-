import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Calendar } from 'lucide-react';
import { churchData } from '../data/churchData';

interface NavbarProps {
  onOpenPlanVisit: () => void;
  onOpenLocation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPlanVisit, onOpenLocation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About & Pastor', href: '#about' },
    { label: 'Ministries', href: '#ministries' },
    { label: 'Youth', href: '#youth' },
    { label: 'Sermons', href: '#sermons' },
    { label: 'Groups', href: '#groups' },
    { label: 'Prayer Request', href: '#prayer' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md py-2.5 shadow-2xl border-b border-white/10'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border-2 border-[#dd5234] flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shrink-0">
              <img
                src={churchData.logo}
                alt={`${churchData.name} Logo`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-heading font-extrabold text-base sm:text-lg tracking-wider leading-none">
                {churchData.shortName}
              </span>
              <span className="text-[10px] text-[#dd5234] uppercase tracking-widest font-semibold font-heading">
                UNITED PENTECOSTAL CHURCH
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-[13px] font-medium text-neutral-300 hover:text-white transition-colors relative py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#dd5234] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenLocation}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-[#dd5234] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#dd5234]" />
              <span>Directions</span>
            </button>
            <button
              onClick={onOpenPlanVisit}
              className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-1.5 cursor-pointer rounded-none"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan A Visit</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none hover:text-[#dd5234] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between pt-20 pb-8 px-6 lg:hidden animate-fade-in">
          <div className="flex flex-col gap-5 items-center text-center pt-4">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-200 hover:text-[#dd5234] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocation();
              }}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-neutral-700"
            >
              <MapPin className="w-4 h-4 text-[#dd5234]" />
              <span>Sanctuary Directions</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanVisit();
              }}
              className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-3 font-bold uppercase tracking-wider text-xs shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan A Visit</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
