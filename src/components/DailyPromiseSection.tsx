import React, { useState } from 'react';
import { churchData } from '../data/churchData';
import { Sparkles, Copy, Check, Share2, RefreshCw, BookOpen, Heart, Quote } from 'lucide-react';

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
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#fffaf4] via-[#fbf6ee] to-[#f6efe4] text-[#222222] relative overflow-hidden border-t border-[#eddccb]/60 border-b-4 border-[#111111]">
      {/* Radiant Background Ambient Warm Lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#dd5234]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-[#dd5234]/30 text-[#dd5234] px-4 py-1 text-xs font-heading font-bold uppercase tracking-widest mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#dd5234]" />
            இன்றைய வாக்குத்தத்தம் • Scripture of the Day
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold uppercase tracking-tight text-[#111111]">
            Daily Promise & <span className="text-[#dd5234]">Word of Life</span>
          </h2>
          <p className="text-neutral-600 text-xs sm:text-sm mt-2 font-normal">
            Receive God's unfailing promise and supernatural peace for you and your family today.
          </p>
        </div>

        {/* Main Radiant Promise Card */}
        <div className="bg-white border-t-4 border-t-[#dd5234] border-x border-b border-[#e9dcce] shadow-xl p-6 sm:p-10 relative transition-all duration-300">
          
          {/* Subtle Quote Watermark */}
          <div className="absolute top-6 right-8 text-[#dd5234]/10 pointer-events-none hidden sm:block">
            <Quote className="w-20 h-20" />
          </div>

          {/* Top Bar: Theme Badge + Language Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-100 pb-5 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dd5234] animate-pulse" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#dd5234]">
                {currentPromise.themeTamil} • {currentPromise.theme}
              </span>
            </div>

            {/* Language Switch Pills */}
            <div className="flex items-center bg-[#f7f2e7] p-1 border border-[#e5d8c8] text-xs">
              <button
                onClick={() => setLangMode('both')}
                className={`px-3 py-1.5 font-medium transition-all cursor-pointer ${
                  langMode === 'both' ? 'bg-[#dd5234] text-white shadow-sm font-semibold' : 'text-neutral-700 hover:text-[#dd5234]'
                }`}
              >
                Bilingual (இருமொழிகளிலும்)
              </button>
              <button
                onClick={() => setLangMode('tamil')}
                className={`px-3 py-1.5 font-medium transition-all cursor-pointer ${
                  langMode === 'tamil' ? 'bg-[#dd5234] text-white shadow-sm font-semibold' : 'text-neutral-700 hover:text-[#dd5234]'
                }`}
              >
                தமிழ் (Tamil)
              </button>
              <button
                onClick={() => setLangMode('english')}
                className={`px-3 py-1.5 font-medium transition-all cursor-pointer ${
                  langMode === 'english' ? 'bg-[#dd5234] text-white shadow-sm font-semibold' : 'text-neutral-700 hover:text-[#dd5234]'
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
              <div className="relative bg-[#fffdf9] p-5 sm:p-6 border-l-4 border-[#dd5234] border-y border-r border-[#faede0]">
                <p className="text-lg sm:text-2xl font-serif text-[#1a1a1a] leading-relaxed italic font-medium">
                  "{currentPromise.textTamil}"
                </p>
                <div className="mt-3 text-[#dd5234] font-heading font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{currentPromise.referenceTamil}</span>
                </div>
              </div>
            )}

            {/* English Scripture */}
            {(langMode === 'both' || langMode === 'english') && (
              <div className="relative bg-[#fcfbfa] p-5 sm:p-6 border-l-4 border-[#111111] border-y border-r border-neutral-200">
                <p className="text-base sm:text-xl text-[#2a2a2a] font-sans leading-relaxed italic font-normal">
                  "{currentPromise.textEnglish}"
                </p>
                <div className="mt-3 text-[#111111] font-heading font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center sm:justify-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#dd5234]" />
                  <span>{currentPromise.reference}</span>
                </div>
              </div>
            )}

          </div>

          {/* Action Tools: Copy, Share on WhatsApp, Shuffle Next */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-6 mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-[#f7f2e7] hover:bg-[#eee6d7] text-neutral-800 hover:text-black px-4 py-2.5 text-xs font-semibold border border-[#ded0bf] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Scripture'}
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share to WhatsApp Status
              </button>
            </div>

            <button
              onClick={handleNextPromise}
              className="bg-[#111111] hover:bg-[#dd5234] text-white px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-2 cursor-pointer ml-auto shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Next Promise ({currentIndex + 1}/{promises.length})
            </button>
          </div>

          {/* Encouraging Footer Note */}
          <div className="mt-5 pt-3 border-t border-neutral-100 text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
            <Heart className="w-3 h-3 text-[#dd5234]" />
            <span>United Pentecostal Church, Bodi • Led by Pastor Rajan Joel</span>
          </div>

        </div>

      </div>
    </section>
  );
};
