import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Calendar, Church } from 'lucide-react';
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
    { label: 'Plan Your Visit', action: onOpenPlanVisit, isSpecial: true },
    { label: 'About & Pastor', href: '#about' },
    { label: 'Location', action: onOpenLocation },
    { label: 'Ministries', href: '#ministries' },
    { label: 'Sermons', href: '#sermons' },
    { label: 'Groups', href: '#groups' },
    { label: 'Prayer Request', href: '#prayer' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md py-3 shadow-2xl border-b border-white/10'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-sm bg-[#dd5234] flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shadow-md">
              <Church className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-heading font-extrabold text-lg sm:text-xl tracking-wider leading-none">
                {churchData.shortName}
              </span>
              <span className="text-xs text-[#dd5234] uppercase tracking-widest font-semibold font-heading">
                UNITED PENTECOSTAL
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, idx) => (
              link.action ? (
                <button
                  key={idx}
                  onClick={link.action}
                  className={`text-sm font-heading tracking-wider uppercase font-semibold transition-all relative py-1 focus:outline-none cursor-pointer ${
                    link.isSpecial
                      ? 'text-[#dd5234] hover:text-white'
                      : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#dd5234] transition-all duration-300 hover:w-full group-hover:w-full" />
                </button>
              ) : (
                <a
                  key={idx}
                  href={link.href}
                  className="text-sm font-heading tracking-wider uppercase font-semibold text-neutral-200 hover:text-white transition-all relative py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#dd5234] transition-all duration-300 group-hover:w-full" />
                </a>
              )
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenLocation}
              className="px-3.5 py-2 text-xs font-heading font-bold uppercase tracking-wider text-white hover:text-[#dd5234] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#dd5234]" />
              Directions
            </button>
            <button
              onClick={onOpenPlanVisit}
              className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-widest transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer rounded-none"
            >
              <Calendar className="w-3.5 h-3.5" />
              Plan A Visit
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none hover:text-[#dd5234] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden animate-fade-in">
          <div className="flex flex-col gap-6 items-center text-center">
            {navLinks.map((link, idx) => (
              link.action ? (
                <button
                  key={idx}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    link.action?.();
                  }}
                  className="text-2xl font-heading font-bold uppercase text-white hover:text-[#dd5234] transition-colors tracking-wide"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-bold uppercase text-white hover:text-[#dd5234] transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanVisit();
              }}
              className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-3.5 font-heading font-bold uppercase tracking-widest text-sm shadow-xl"
            >
              I'm Coming This Sunday!
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocation();
              }}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 font-heading font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#dd5234]" />
              View Map & Location
            </button>
          </div>
        </div>
      )}
    </>
  );
};
