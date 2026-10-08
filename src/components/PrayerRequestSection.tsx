import React, { useState } from 'react';
import { churchData } from '../data/churchData';
import { Heart, Send, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PrayerRequestSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(churchData.prayerCategories[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requestText, setRequestText] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState<'team' | 'pastor'>('team');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 }
    });

    const categoryName = churchData.prayerCategories.find(c => c.id === selectedCategory)?.name || 'General';
    const subject = encodeURIComponent(`[Prayer Request - ${categoryName}] from ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCategory: ${categoryName}\nConfidentiality: ${privacyLevel === 'pastor' ? 'Pastor Rajan Joel Only' : 'Prayer Team'}\n\nPrayer Request Details:\n${requestText}`
    );
    
    console.log(`Sending prayer request to ${churchData.socials.email}: subject=${subject}&body=${body}`);
  };

  return (
    <section
      id="prayer"
      className="relative py-16 sm:py-24 text-white bg-fixed-parallax"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1920&q=80')`
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-black/80 via-black/70 to-black/85" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-white/10 px-3.5 py-1 border border-white/20 inline-block mb-2.5">
            Intercession & Spiritual Support
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white mb-2.5">
            We Believe In The Power Of Prayer
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            "For where two or three gather in my name, there am I with them." Whatever mountain you are facing, <strong className="text-white font-medium">{churchData.pastorName}</strong> and our prayer intercessors are ready to stand in faith with you.
          </p>
        </div>

        {/* Prayer Form Card */}
        <div className="bg-neutral-900/95 border border-neutral-800 p-5 sm:p-8 shadow-2xl max-w-xl mx-auto backdrop-blur-md">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-heading font-bold tracking-widest text-[#dd5234]">
                Prayer Request Received
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase text-white mt-1 mb-2">
                We Are Praying For You, {fullName}!
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6 leading-relaxed">
                Your prayer request has been sent to <strong>{churchData.pastorName}</strong> and our dedicated prayer team. Be encouraged — God hears your cries and is working on your behalf!
              </p>

              <div className="bg-black/50 p-4 border border-neutral-800 text-left text-xs text-neutral-300 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Mail className="w-4 h-4 text-[#dd5234]" />
                  <span>Confirmation dispatched to: {email}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy status: {privacyLevel === 'pastor' ? 'Confidential (Pastoral Team Only)' : 'Shared with Intercession Team'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setRequestText('');
                }}
                className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Another Prayer Need
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Privacy Toggle */}
              <div>
                <label className="block text-xs uppercase font-heading font-bold tracking-wider text-neutral-300 mb-2">
                  Confidentiality Preference:
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-black/50 border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setPrivacyLevel('team')}
                    className={`py-2 px-3 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                      privacyLevel === 'team'
                        ? 'bg-[#dd5234] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Prayer Team & Intercessors
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrivacyLevel('pastor')}
                    className={`py-2 px-3 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                      privacyLevel === 'pastor'
                        ? 'bg-[#dd5234] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Pastor Rajan Joel Only
                  </button>
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs uppercase font-heading font-bold tracking-wider text-neutral-300 mb-2">
                  Select Prayer Focus:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-black/60 border border-neutral-700 text-white px-4 py-3 text-sm focus:border-[#dd5234] focus:outline-none"
                >
                  {churchData.prayerCategories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-neutral-900 text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-heading font-bold tracking-wider text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/60 border border-neutral-700 text-white text-sm focus:border-[#dd5234] focus:outline-none placeholder-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-heading font-bold tracking-wider text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/60 border border-neutral-700 text-white text-sm focus:border-[#dd5234] focus:outline-none placeholder-neutral-500"
                  />
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="block text-xs uppercase font-heading font-bold tracking-wider text-neutral-300 mb-1">
                  Phone Number (Optional - for prayer call/text)
                </label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/60 border border-neutral-700 text-white text-sm focus:border-[#dd5234] focus:outline-none placeholder-neutral-500"
                />
              </div>

              {/* Prayer Request Details */}
              <div>
                <label className="block text-xs uppercase font-heading font-bold tracking-wider text-neutral-300 mb-1">
                  How Can We Pray For You? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your heart, prayer need, or praise report with us..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-neutral-700 text-white text-sm focus:border-[#dd5234] focus:outline-none placeholder-neutral-500 leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#dd5234] hover:bg-[#b1422a] text-white py-4 font-heading font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Prayer Request</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
                <Heart className="w-3.5 h-3.5 text-[#dd5234] fill-[#dd5234]" />
                <span>Connected directly to {churchData.pastorName} & Prayer Ministry</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
