import React, { useState } from 'react';
import { churchData } from '../data/churchData';
import { Sparkles, Copy, Check, Share2, RefreshCw, BookOpen, Heart } from 'lucide-react';

export const DailyPromiseSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [langMode, setLangMode] = useState<'both' | 'tamil' | 'english'>('both');
  const [copied, setCopied] = useState(false);

  const promises = churchData.dailyPromises || [];
  const currentPromise = promises[currentIndex] || promises[0];

  const handleNextPromise = () => {
    setCurrentIndex((prev) => (prev + 1) % promises.length);
    setCopied(false);
  };

  const handleCopy = () => {
    let textToCopy = "";
    if (langMode === 'tamil') {
      textToCopy = `📖 ${currentPromise.referenceTamil}\n"${currentPromise.textTamil}"\n\n— United Pentecostal Church (UPC), Bodi`;
    } else if (langMode === 'english') {
      textToCopy = `📖 ${currentPromise.reference}\n"${currentPromise.textEnglish}"\n\n— United Pentecostal Church (UPC), Bodi`;
    } else {
      textToCopy = `📖 ${currentPromise.referenceTamil} / ${currentPromise.reference}\n\n"${currentPromise.textTamil}"\n\n"${currentPromise.textEnglish}"\n\n— United Pentecostal Church (UPC), Bodi`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const textToShare = `📖 *தேவனுடைய வாக்குத்தத்தம் | Daily Promise*\n\n*${currentPromise.referenceTamil}*\n"${currentPromise.textTamil}"\n\n*${currentPromise.reference}*\n"${currentPromise.textEnglish}"\n\n⛪ *UNITED PENTECOSTAL CHURCH (UPC), BODI*\nJoin us this Sunday at 5:30 AM & 9:00 AM\nhttps://maps.app.goo.gl/UdonX2UpNLX8pDzf6`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 sm:py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dd5234]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#dd5234]/20 border border-[#dd5234]/40 text-[#dd5234] px-3.5 py-1 text-xs font-heading font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            இன்றைய வாக்குத்தத்தம் • Scripture of the Day
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold uppercase tracking-tight text-white">
            Daily Promise & <span className="text-[#dd5234]">Word of Life</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-2">
            Receive God's unfailing promise for you and your family today.
          </p>
        </div>

        {/* Promise Card Box */}
        <div className="bg-[#181818] border border-neutral-800 shadow-2xl p-6 sm:p-10 relative">
          
          {/* Top Bar: Theme Badge + Language Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-800 pb-5 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dd5234]" />
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#dd5234]">
                {currentPromise.themeTamil} • {currentPromise.theme}
              </span>
            </div>

            {/* Language Switch Pills */}
            <div className="flex items-center bg-[#101010] p-1 border border-neutral-700 text-xs">
              <button
                onClick={() => setLangMode('both')}
                className={`px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  langMode === 'both' ? 'bg-[#dd5234] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Bilingual (இருமொழிகளிலும்)
              </button>
              <button
                onClick={() => setLangMode('tamil')}
                className={`px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  langMode === 'tamil' ? 'bg-[#dd5234] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                தமிழ் (Tamil)
              </button>
              <button
                onClick={() => setLangMode('english')}
                className={`px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  langMode === 'english' ? 'bg-[#dd5234] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Scripture Verse Presentation */}
          <div className="space-y-6 my-2 text-center sm:text-left">
            
            {/* Tamil Scripture */}
            {(langMode === 'both' || langMode === 'tamil') && (
              <div className="relative">
                <p className="text-lg sm:text-2xl font-serif text-neutral-100 leading-relaxed italic font-normal">
                  "{currentPromise.textTamil}"
                </p>
                <div className="mt-2 text-[#dd5234] font-heading font-bold text-sm sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-2">
                  <BookOpen className="w-4 h-4" />
                  {currentPromise.referenceTamil}
                </div>
              </div>
            )}

            {/* Divider if both */}
            {langMode === 'both' && (
              <hr className="border-neutral-800 my-4" />
            )}

            {/* English Scripture */}
            {(langMode === 'both' || langMode === 'english') && (
              <div className="relative">
                <p className="text-base sm:text-xl text-neutral-300 font-sans leading-relaxed italic">
                  "{currentPromise.textEnglish}"
                </p>
                <div className="mt-2 text-neutral-400 font-heading font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center sm:justify-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#dd5234]" />
                  {currentPromise.reference}
                </div>
              </div>
            )}

          </div>

          {/* Action Tools: Copy, Share on WhatsApp, Shuffle Next */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 pt-6 mt-8">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-[#242424] hover:bg-[#303030] text-neutral-200 hover:text-white px-3.5 py-2 text-xs font-medium border border-neutral-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Verse'}
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 px-3.5 py-2 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share to WhatsApp Status
              </button>
            </div>

            <button
              onClick={handleNextPromise}
              className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Next Promise ({currentIndex + 1}/{promises.length})
            </button>
          </div>

          {/* Encouraging Footer Note */}
          <div className="mt-4 pt-3 border-t border-neutral-800/60 text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
            <Heart className="w-3 h-3 text-[#dd5234]" />
            United Pentecostal Church, Bodi • Pastor Rajan Joel
          </div>

        </div>

      </div>
    </section>
  );
};
