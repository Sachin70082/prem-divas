"use client";

import React from "react";
import { X, HelpCircle, Sparkles, Music, Image as ImageIcon, Heart } from "lucide-react";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const FAQS = [
    {
      q: "How does the Spotify Playlist integration work?",
      a: "Our website links directly to our official Spotify wedding playlist. When developers or organizers add new tracks on Spotify, the website fetches and plays those new songs automatically!",
    },
    {
      q: "How can I change the background images?",
      a: "Use the top Rasam mood bar (Haldi, Mehendi, Sangeet, Shaadi, Bidaayi, Reception, 1st Night, Deluxe Saloon, Deluxe Bus) to toggle full-screen background themes according to your preference anytime!",
    },
    {
      q: "Can I play random songs from the playlist?",
      a: "Yes! Click the '🔀 Shuffle' or '✨ Random Song' button in the music player to instantly pick and play a random wedding track from the playlist.",
    },
    {
      q: "What regional languages are supported?",
      a: "We include songs across Punjabi, Hindi, Rajasthani/Marwadi, Garhwali/Pahadi, Bhojpuri, Gujarati, Bengali, and South Indian regional wedding traditions.",
    },
    {
      q: "Can I embed my own Spotify Playlist?",
      a: "Absolutely! Click the 'Spotify Playlist' button in the top navbar, paste your Spotify playlist URL or ID, and click 'Sync' to stream your custom playlist.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-xl rounded-3xl p-6 border border-white/20 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
            <p className="text-xs text-white/70">Everything you need to know about VIVAAH RADIO</p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all"
            >
              <h4 className="text-sm font-bold text-amber-200 mb-1.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-white/80 leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
