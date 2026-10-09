import React, { useState } from 'react';
import { churchData } from '../data/churchData';
import { MessageCircle, X, Send, Heart, MapPin, Sparkles } from 'lucide-react';

export const WhatsAppFloatingHotline: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Use WhatsApp number or fallback
  const phone = churchData.socials.whatsappNumber || "919840000000";

  const openWhatsAppWithMessage = (text: string) => {
    const fullText = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${fullText}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  const handleQuickOption = (type: 'prayer' | 'visit' | 'pastor') => {
    if (type === 'prayer') {
      openWhatsAppWithMessage(`Praise the Lord Pastor & UPC Prayer Team 🙏\nI would like to request prayer for:\n- `);
    } else if (type === 'visit') {
      openWhatsAppWithMessage(`Praise the Lord! ⛪\nI am planning to visit United Pentecostal Church in Bodi this Sunday (5:30 AM / 9:00 AM). Could you please share the directions and details?`);
    } else if (type === 'pastor') {
      openWhatsAppWithMessage(`Praise the Lord Pastor Rajan Joel,\nI am contacting from the UPC Church website. I have a question regarding:\n- `);
    }
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    openWhatsAppWithMessage(`Praise the Lord! 🕊️\n${customMsg.trim()}`);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#161616] text-white border border-neutral-700 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#075E54] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5 border border-white/20">
                <img
                  src={churchData.logo}
                  alt={churchData.shortName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm tracking-wide leading-tight">
                  UPC Prayer & Help Hotline
                </h4>
                <p className="text-[11px] text-green-200 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Usually replies within minutes
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 transition-colors cursor-pointer"
              aria-label="Close hotline"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Options */}
          <div className="p-4 space-y-2.5 bg-[#1a1a1a]">
            <p className="text-xs text-neutral-400 font-medium">
              Choose a quick option to message us directly on WhatsApp:
            </p>

            <button
              onClick={() => handleQuickOption('prayer')}
              className="w-full text-left bg-[#242424] hover:bg-[#2c2c2c] border border-neutral-700 hover:border-[#25D366] p-2.5 flex items-start gap-2.5 transition-all group cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#dd5234] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-heading font-bold text-white group-hover:text-[#25D366]">
                  Request Immediate Prayer (ஜெப விண்ணப்பம்)
                </div>
                <div className="text-[11px] text-neutral-400">
                  Send your private prayer need to Pastor & team
                </div>
              </div>
            </button>

            <button
              onClick={() => handleQuickOption('visit')}
              className="w-full text-left bg-[#242424] hover:bg-[#2c2c2c] border border-neutral-700 hover:border-[#25D366] p-2.5 flex items-start gap-2.5 transition-all group cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#dd5234] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-heading font-bold text-white group-hover:text-[#25D366]">
                  Sunday Visit & Direction Guide
                </div>
                <div className="text-[11px] text-neutral-400">
                  Ask about timings, parking & Bodi location
                </div>
              </div>
            </button>

            <button
              onClick={() => handleQuickOption('pastor')}
              className="w-full text-left bg-[#242424] hover:bg-[#2c2c2c] border border-neutral-700 hover:border-[#25D366] p-2.5 flex items-start gap-2.5 transition-all group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#dd5234] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-heading font-bold text-white group-hover:text-[#25D366]">
                  General Inquiry / Connect with Pastor
                </div>
                <div className="text-[11px] text-neutral-400">
                  Have a spiritual question or church inquiry
                </div>
              </div>
            </button>
          </div>

          {/* Custom Message Input */}
          <form onSubmit={handleSendCustom} className="p-3 bg-[#141414] border-t border-neutral-800 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-[#222222] border border-neutral-700 text-xs px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white px-3 py-2 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer font-heading font-bold text-xs uppercase tracking-wider group"
        aria-label="Open WhatsApp Prayer and Help Hotline"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">WhatsApp Prayer Line</span>
      </button>

    </div>
  );
};
