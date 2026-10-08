import { churchData } from '../data/churchData';
import { MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPlanVisit: () => void;
  onOpenLocation: () => void;
}

export const Footer = ({ onOpenPlanVisit, onOpenLocation }: FooterProps) => {
  return (
    <footer className="bg-black text-white border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-[#dd5234] flex items-center justify-center shrink-0 shadow-lg">
                <img
                  src={churchData.logo}
                  alt={`${churchData.name} Logo`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-heading font-extrabold text-lg tracking-wider leading-none">
                  {churchData.shortName}
                </span>
                <span className="text-[10px] text-[#dd5234] uppercase tracking-widest font-semibold font-heading">
                  UNITED PENTECOSTAL CHURCH
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
              {churchData.tagline}. A life-giving, spirit-empowered community led by {churchData.pastorName}.
            </p>
            {/* Social Icons (Instagram & YouTube) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={churchData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-neutral-900 hover:bg-[#dd5234] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Instagram"
                title="Follow us on Instagram @upc_church_bodi"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={churchData.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-neutral-900 hover:bg-[#dd5234] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="YouTube"
                title="Watch us on YouTube @UnitedpentecostalchurchBODI"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-base uppercase tracking-wider text-[#dd5234] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-medium">
              <li>
                <button onClick={onOpenPlanVisit} className="hover:text-white transition-colors cursor-pointer text-left">
                  Plan Your Sunday Visit
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Pastor Rajan Joel
                </a>
              </li>
              <li>
                <a href="#ministries" className="hover:text-white transition-colors">
                  Children, Youth & Women
                </a>
              </li>
              <li>
                <a href="#groups" className="hover:text-white transition-colors">
                  Connect Groups
                </a>
              </li>
              <li>
                <a href="#sermons" className="hover:text-white transition-colors">
                  Latest Sermons
                </a>
              </li>
              <li>
                <a href="#prayer" className="hover:text-white transition-colors">
                  Submit Prayer Request
                </a>
              </li>
            </ul>
          </div>

          {/* Sunday Service & Prayer Times */}
          <div>
            <h4 className="font-heading font-bold text-base uppercase tracking-wider text-[#dd5234] mb-4">
              Sunday Gatherings
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div>
                <p className="font-heading font-bold text-white uppercase text-xs">Early Morning Service</p>
                <p className="text-neutral-300">5:30 AM – 7:00 AM</p>
              </div>
              <div>
                <p className="font-heading font-bold text-white uppercase text-xs">Main Morning Worship</p>
                <p className="text-neutral-300">9:00 AM – 12:30 PM</p>
              </div>
              <div>
                <p className="font-heading font-bold text-white uppercase text-xs">Children's Sunday Class</p>
                <p className="text-neutral-300">10:30 AM – 11:50 AM</p>
              </div>
              <div>
                <p className="font-heading font-bold text-white uppercase text-xs">Youth & Women's Prayer</p>
                <p className="text-neutral-300">1:00 PM – 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Campus Location & Maps */}
          <div>
            <h4 className="font-heading font-bold text-base uppercase tracking-wider text-[#dd5234] mb-4">
              Campus & Location
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-400">
              <p className="text-neutral-300 font-medium">
                {churchData.location.address}
              </p>
              <p className="text-neutral-500 text-xs">
                {churchData.location.landmark}
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenLocation}
                  className="bg-white/10 hover:bg-[#dd5234] text-white py-2.5 px-4 text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  View Campus Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {churchData.name}. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#dd5234] fill-[#dd5234]" /> for God's Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
};
