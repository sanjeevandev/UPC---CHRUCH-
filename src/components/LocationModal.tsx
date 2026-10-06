import React from 'react';
import { churchData } from '../data/churchData';
import { X, MapPin, ExternalLink, Navigation, Clock, Car } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white text-[#303030] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-scale-up border-t-8 border-[#111111]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234]">
            Sanctuary & Campus
          </span>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase text-neutral-900 mt-1">
            Location & Directions
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Join us in person at {churchData.name}.
          </p>
        </div>

        {/* Location Info Box */}
        <div className="bg-[#f7f2e7] p-6 border border-neutral-200 mb-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-[#dd5234] text-white flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#dd5234]">Campus Address</p>
              <h4 className="font-heading font-bold text-xl text-neutral-900">{churchData.location.address}</h4>
              <p className="text-xs sm:text-sm text-neutral-600">{churchData.location.cityState}</p>
              <p className="text-xs text-neutral-500 mt-1">{churchData.location.landmark}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-300/70 text-xs">
            <div className="flex items-center gap-2 text-neutral-700">
              <Car className="w-4 h-4 text-[#dd5234]" />
              <span>Free On-Site Guest Parking</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Clock className="w-4 h-4 text-[#dd5234]" />
              <span>Sunday at 10:00 AM</span>
            </div>
          </div>
        </div>

        {/* Google Maps Action */}
        <div className="space-y-3">
          <a
            href={churchData.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-4 px-4 font-heading font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps / GPS</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onClose}
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
