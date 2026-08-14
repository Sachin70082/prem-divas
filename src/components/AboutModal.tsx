"use client";

import React from "react";
import { X, Info, Heart, Music, Sparkles, ExternalLink, Code2 } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-white/20 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-xl">
          <Heart className="w-8 h-8 fill-amber-400/30" />
        </div>

        <h3 className="text-2xl font-bold font-devanagari text-white mb-1 text-glow-gold">
          विवाह रेडियो • SHAADI JUKEBOX
        </h3>

        <p className="text-xs font-semibold text-amber-300 tracking-wider uppercase mb-3">
          Indian Regional Wedding Music Player & Ambient Jukebox
        </p>

        <p className="text-xs text-white/80 leading-relaxed mb-4">
          Crafted for Indian wedding celebrations, haldi ceremonies, mehendi nights, baraats, and after-parties. Seamlessly synced with Spotify playlists for continuous music streams and immersive full-screen background visuals.
        </p>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1 mb-4 text-left">
          <div className="flex items-center gap-2 font-semibold text-emerald-300">
            <Code2 className="w-4 h-4" />
            <span>Developer Note:</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            As developers add new tracks to the connected Spotify playlist, they instantly sync to the web player. Built with Next.js, Tailwind CSS, Framer Motion, and Spotify Web API integration.
          </p>
        </div>

        <div className="text-[11px] text-white/50 font-mono">
          Developed with ❤️ by Antigravity AI
        </div>
      </div>
    </div>
  );
};
