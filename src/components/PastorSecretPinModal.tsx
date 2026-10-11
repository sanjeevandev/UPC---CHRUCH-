import React, { useState } from 'react';
import { getAdminPIN } from '../data/eventsData';
import { Lock, X, KeyRound, Sparkles } from 'lucide-react';

interface PastorSecretPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PastorSecretPinModal: React.FC<PastorSecretPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getAdminPIN();
    if (pin.trim() === correctPin) {
      setHasError(false);
      setPin('');
      onSuccess();
      onClose();
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-neutral-900 border border-neutral-700 w-full max-w-sm p-6 shadow-2xl z-10 text-white text-center">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-[#dd5234]/20 border border-[#dd5234]/40 text-[#dd5234] mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg">
          <KeyRound className="w-7 h-7" />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-widest text-[#dd5234] mb-1">
          <Sparkles className="w-3 h-3" />
          <span>Pastor Stealth Access</span>
        </div>

        <h3 className="font-heading font-extrabold text-xl uppercase tracking-wide text-white mb-2">
          Unlock Live Edit Mode
        </h3>

        <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
          Enter church leadership PIN to edit events and schedules directly on the page.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setHasError(false);
              }}
              autoFocus
              className="w-full bg-black/60 border border-neutral-700 focus:border-[#dd5234] px-4 py-3 text-center text-xl tracking-widest text-white font-mono focus:outline-none"
            />
            {hasError && (
              <p className="text-xs text-red-400 font-medium mt-2">
                Incorrect security PIN. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-3 font-heading font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Enable Live Edit Mode</span>
          </button>
        </form>

        <p className="text-[10px] text-neutral-500 mt-4">
          Confidential to UPC Bodi Pastoral Leadership.
        </p>
      </div>
    </div>
  );
};
