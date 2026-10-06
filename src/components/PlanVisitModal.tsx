import React, { useState } from 'react';
import { churchData } from '../data/churchData';
import { X, Calendar, CheckCircle2, Gift, Car, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWithKids?: boolean;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({
  isOpen,
  onClose,
  initialWithKids = false,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceDate, setServiceDate] = useState('Sunday Morning Main Service (9:00 AM – 12:30 PM)');
  const [bringingKids, setBringingKids] = useState(initialWithKids);
  const [kidsCount, setKidsCount] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#303030] max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-scale-up border-t-8 border-[#dd5234]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs uppercase font-heading font-bold tracking-widest text-[#dd5234]">
              You're On The VIP Guest List!
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase text-neutral-900 mt-1 mb-3">
              We Can't Wait To Meet You, {fullName}!
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
              We have reserved your VIP greeting for <strong>{serviceDate}</strong> at {churchData.name}. Our team will have a free welcome packet ready for you at the front entrance!
            </p>

            <div className="bg-[#f7f2e7] p-4 text-left text-xs space-y-2 mb-6 border-l-4 border-[#dd5234]">
              <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                <Car className="w-4 h-4 text-[#dd5234]" />
                <span>Reserved VIP Parking Available</span>
              </div>
              {bringingKids && (
                <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{kidsCount} Kid(s) pre-registered for Children's Class (10:30 AM – 11:50 AM)</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                <Gift className="w-4 h-4 text-[#dd5234]" />
                <span>Free Welcome Gift waiting at the Front Desk</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#111111] hover:bg-[#dd5234] text-white py-3.5 font-heading font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
            >
              Done & Return to Homepage
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234]">
                VIP Guest Experience
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase text-neutral-900 mt-1">
                Plan Your Visit
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Let us know which Sunday service you are attending so we can welcome you warmly!
              </p>
            </div>

            {/* VIP Perks Bar */}
            <div className="grid grid-cols-3 gap-2 bg-[#f7f2e7] p-3 text-center text-[11px] font-semibold text-neutral-700 mb-6">
              <div>🚗 Free Parking</div>
              <div>📖 Bible Ministry</div>
              <div>🎁 Welcome Gift</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-heading font-bold text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 text-sm focus:border-[#dd5234] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-heading font-bold text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 text-sm focus:border-[#dd5234] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-heading font-bold text-neutral-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 text-sm focus:border-[#dd5234] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-heading font-bold text-neutral-700 mb-1">
                  Select Sunday Gathering / Service *
                </label>
                <select
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 text-sm focus:border-[#dd5234] focus:outline-none"
                >
                  <option value="Sunday Early Morning Service (5:30 AM – 7:00 AM)">
                    Sunday Early Morning Service (5:30 AM – 7:00 AM)
                  </option>
                  <option value="Sunday Morning Main Service (9:00 AM – 12:30 PM)">
                    Sunday Morning Main Service (9:00 AM – 12:30 PM)
                  </option>
                  <option value="Sunday Children's Class (10:30 AM – 11:50 AM)">
                    Sunday Children's Class (10:30 AM – 11:50 AM)
                  </option>
                  <option value="Sunday Youth Prayer Fellowship (1:00 PM – 2:00 PM)">
                    Sunday Youth Prayer Fellowship (1:00 PM – 2:00 PM)
                  </option>
                  <option value="Sunday Women's Prayer Fellowship (1:00 PM – 2:00 PM)">
                    Sunday Women's Prayer Fellowship (1:00 PM – 2:00 PM)
                  </option>
                </select>
              </div>

              {/* Kids Pre-Registration Checkbox */}
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bringingKids}
                    onChange={(e) => setBringingKids(e.target.checked)}
                    className="w-4 h-4 text-[#dd5234] accent-[#dd5234] rounded"
                  />
                  <span className="text-xs font-heading font-bold uppercase tracking-wide text-neutral-800">
                    I am bringing children (Children's Class 10:30 AM – 11:50 AM)
                  </span>
                </label>

                {bringingKids && (
                  <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-xs text-neutral-600 font-medium">How many children?</span>
                    <select
                      value={kidsCount}
                      onChange={(e) => setKidsCount(e.target.value)}
                      className="px-3 py-1 text-xs border border-neutral-300 bg-white"
                    >
                      <option value="1">1 Child</option>
                      <option value="2">2 Children</option>
                      <option value="3">3 Children</option>
                      <option value="4+">4+ Children</option>
                    </select>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-4 font-heading font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm My Sunday Visit</span>
              </button>

              <p className="text-[11px] text-center text-neutral-500 pt-1">
                We look forward to worshipping with you!
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
