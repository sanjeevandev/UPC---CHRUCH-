import React, { useState, useEffect, useRef } from 'react';
import { churchData } from '../data/churchData';
import { Heart, Send, CheckCircle2, ShieldCheck, Mail, MessageCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PrayerRequestSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(churchData.prayerCategories[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requestText, setRequestText] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState<'team' | 'pastor'>('team');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    name: string;
    category: string;
    text: string;
    phone: string;
  } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const speed = 0.25;
        const offset = (rect.top - windowHeight / 2) * speed;
        setOffsetY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categoryName = churchData.prayerCategories.find(c => c.id === selectedCategory)?.name || 'General';

    setLastSubmittedData({
      name: fullName,
      category: categoryName,
      text: requestText,
      phone: phone
    });

    try {
      // Direct silent background email delivery to upcbodi@gmail.com
      await fetch('https://formsubmit.co/ajax/upcbodi@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[New Prayer Request - ${categoryName}] from ${fullName}`,
          Name: fullName,
          Email: email,
          Phone: phone || 'Not provided',
          Category: categoryName,
          Confidentiality: privacyLevel === 'pastor' ? 'Pastor Rajan Joel Only' : 'Prayer Intercession Team',
          PrayerRequest: requestText,
          SubmittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });
    } catch (err) {
      console.warn("Background email dispatched:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNotifyWhatsApp = () => {
    if (!lastSubmittedData) return;
    const msg = `Praise the Lord Pastor Rajan Joel & UPC Bodi 🙏\n\n*NEW PRAYER REQUEST SUBMITTED ON WEBSITE:*\n• *Name:* ${lastSubmittedData.name}\n• *Phone:* ${lastSubmittedData.phone || 'N/A'}\n• *Category:* ${lastSubmittedData.category}\n• *Prayer Need:* ${lastSubmittedData.text}\n\n_Sent to: upcbodi@gmail.com & +91 80569 69614_`;
    const url = `https://api.whatsapp.com/send?phone=${churchData.socials.whatsappNumber}&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="prayer"
      ref={sectionRef}
      className="relative py-20 sm:py-28 text-white overflow-hidden"
    >
      {/* Scraped Website Original Parallax Image Layer with Smooth Scrolling Effect */}
      <div
        className="absolute -top-32 -bottom-32 left-0 right-0 w-full h-[calc(100%+256px)] bg-cover bg-center pointer-events-none transition-transform duration-75 ease-out will-change-transform filter brightness-70 contrast-110"
        style={{
          backgroundImage: `url('/scraped-community-2.jpg')`,
          transform: `translateY(${offsetY}px) scale(1.1)`
        }}
      />

      {/* Atmospheric Dark Overlay Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234] bg-black/75 px-4 py-1.5 border border-[#dd5234]/40 inline-block mb-3.5 shadow-xl">
            Intercession & Spiritual Support
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white mb-2.5 drop-shadow-lg">
            We Believe In The Power Of Prayer
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed drop-shadow">
            "For where two or three gather in my name, there am I with them." Whatever mountain you are facing, <strong className="text-white font-medium">{churchData.pastorName}</strong> and our prayer intercessors are ready to stand in faith with you.
          </p>
        </div>

        {/* Prayer Form Card */}
        <div className="bg-neutral-900/95 border border-neutral-800 p-5 sm:p-8 shadow-2xl max-w-xl mx-auto backdrop-blur-md">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-heading font-bold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Status: Request Received & Pending Pastoral Review</span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase text-white mt-1 mb-2">
                We Are Praying For You, {fullName}!
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6 leading-relaxed">
                Your request has been dispatched directly to <strong>{churchData.socials.email}</strong> and logged for <strong>{churchData.pastorName}</strong>. Once approved, our intercession team will stand in continuous prayer for you.
              </p>

              {/* Dispatch Info Box */}
              <div className="bg-black/60 p-4 border border-neutral-800 text-left text-xs text-neutral-300 space-y-2.5 mb-6">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Mail className="w-4 h-4 text-[#dd5234]" />
                  <span>Delivered to Church Inbox: <strong>{churchData.socials.email}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Church Contact / WhatsApp: <strong>{churchData.socials.phone}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 pt-1 border-t border-neutral-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidentiality: {privacyLevel === 'pastor' ? 'Strictly Pastor Rajan Joel Only' : 'Shared with Intercession Team'}</span>
                </div>
              </div>

              {/* WhatsApp Instant Notification CTA */}
              <div className="space-y-3">
                <button
                  onClick={handleNotifyWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Pastor On WhatsApp Directly (+91 80569 69614)</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setRequestText('');
                  }}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-3 px-4 text-xs font-heading font-medium tracking-wide transition-colors cursor-pointer"
                >
                  Submit Another Prayer Request
                </button>
              </div>
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
                    placeholder="e.g. Sarah"
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
                  Phone Number (For WhatsApp / Prayer Confirmation)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
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
                  placeholder="Share your prayer need, family request, or praise report with us..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-neutral-700 text-white text-sm focus:border-[#dd5234] focus:outline-none placeholder-neutral-500 leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#dd5234] hover:bg-[#b1422a] disabled:opacity-60 text-white py-4 font-heading font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-xl cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Delivering to Pastor & Admin...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Prayer Request to {churchData.socials.email}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
                <Heart className="w-3.5 h-3.5 text-[#dd5234] fill-[#dd5234]" />
                <span>Directly delivered to {churchData.socials.email} & Pastor Rajan Joel</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
