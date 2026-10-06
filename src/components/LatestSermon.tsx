import React, { useState } from 'react';
import { churchData } from '../data/churchData';
import { Play, User, Share2, Check, X, ExternalLink } from 'lucide-react';

export const LatestSermon: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState(churchData.latestSermon.videoId);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${activeVideoId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const currentVideo = churchData.latestSermon.recentMessages.find(v => v.id === activeVideoId) || churchData.latestSermon.recentMessages[0];

  return (
    <>
      <section id="sermons" className="py-20 sm:py-28 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-800 pb-8 gap-4">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#dd5234]">
                Preaching & Live Worship
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1">
                Latest Message
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={churchData.latestSermon.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Visit YouTube Channel</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Main Featured Sermon Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/90 border border-neutral-800 p-6 sm:p-10 shadow-2xl">
            {/* Real YouTube Video Thumbnail Preview */}
            <div
              className="lg:col-span-7 relative group cursor-pointer overflow-hidden rounded-sm"
              onClick={() => {
                setActiveVideoId(churchData.latestSermon.videoId);
                setVideoModalOpen(true);
              }}
            >
              <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
                <img
                  src={churchData.latestSermon.thumbnail}
                  alt={churchData.latestSermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dd5234] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-red-600/90 text-white px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-1.5 shadow">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>@UnitedpentecostalchurchBODI</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-sm px-2.5 py-1 text-xs font-heading font-bold uppercase text-white">
                  {churchData.latestSermon.duration}
                </div>
              </div>
            </div>

            {/* Sermon Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-xs uppercase font-heading font-bold text-[#dd5234] mb-3">
                  <span>{churchData.latestSermon.series}</span>
                  <span>•</span>
                  <span>{churchData.latestSermon.date}</span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase text-white leading-tight mb-4">
                  {churchData.latestSermon.title}
                </h3>

                <p className="text-sm text-neutral-300 font-normal leading-relaxed mb-6">
                  {churchData.latestSermon.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
                  <User className="w-4 h-4 text-[#dd5234]" />
                  <span>Speaker: <strong className="text-white">{churchData.latestSermon.speaker}</strong></span>
                </div>

                {/* Recent Messages Mini Grid from YouTube Channel */}
                <div className="mb-6 pt-4 border-t border-neutral-800">
                  <p className="text-[11px] uppercase font-heading font-bold tracking-wider text-neutral-400 mb-2.5">
                    More Messages from our Channel:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {churchData.latestSermon.recentMessages.slice(1, 3).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveVideoId(item.id);
                          setVideoModalOpen(true);
                        }}
                        className="flex items-center gap-2 p-2 bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 transition-colors text-left cursor-pointer group/item"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-12 h-8 object-cover shrink-0"
                        />
                        <span className="text-[11px] text-neutral-300 group-hover/item:text-[#dd5234] line-clamp-1 font-medium">
                          {item.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveVideoId(churchData.latestSermon.videoId);
                    setVideoModalOpen(true);
                  }}
                  className="bg-[#dd5234] hover:bg-[#b1422a] text-white px-6 py-3 font-heading font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Watch Preaching
                </button>

                <button
                  onClick={handleShare}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 font-heading font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? "Link Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl border border-neutral-800 animate-scale-up">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#dd5234] flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-widest cursor-pointer"
            >
              <X className="w-6 h-6" /> Close Player
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1`}
              title={currentVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};
