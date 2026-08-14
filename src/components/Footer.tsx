"use client";

import React, { useState } from "react";
import {
  Heart,
  Globe,
  Music2,
  Info,
  HelpCircle,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface FooterProps {
  onOpenSpotifyModal: () => void;
  currentRegion: "hindi" | "odia";
  onSelectRegion: (region: "hindi" | "odia") => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSpotifyModal,
  currentRegion,
  onSelectRegion,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 z-30 select-none mt-1 mb-1">
      {/* Floating Collapsed/Expanded Toggle Trigger Bar */}
      <div className="flex justify-center mb-1">
        <button
          onClick={onToggleExpand}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wide transition-all duration-300 cursor-pointer active:scale-95 border shadow-xl backdrop-blur-2xl ${
            isExpanded
              ? "bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white border-amber-300/80 shadow-rose-500/30 ring-2 ring-amber-400/50 scale-105"
              : "bg-black/60 hover:bg-black/80 text-white/90 hover:text-amber-300 border-white/20 hover:border-amber-400/50 shadow-black/60 hover:scale-105"
          }`}
        >
          <Building2 className={`w-4 h-4 ${isExpanded ? "text-white" : "text-amber-400"}`} />
          <span>{isExpanded ? "Hide Footer & Company Details" : "Footer & Company Details"}</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 stroke-[3]" />
          ) : (
            <ChevronUp className="w-4 h-4 stroke-[3] animate-bounce text-amber-300" />
          )}
        </button>
      </div>

      {/* Expandable Glassmorphic Full Footer Card */}
      {isExpanded && (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-white/10">
            
            {/* Company & Parent Company Branding (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Sparkles className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-amber-300 font-brand-english tracking-widest uppercase">
                    Prem-Divas.in • Royal Wedding & Bahaghara Jukebox
                  </h3>
                </div>

                <p className="text-xs text-white/70 leading-relaxed mb-3 font-medium">
                  Prem-Divas.in — India's premier digital wedding music radio. Stream authentic regional wedding songs, Haldi ubtan, Mehendi, Sangeet & Bidaayi playlists synced live with Spotify.
                </p>

                {/* Parent Company Details */}
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                  <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    Brand & Parent Media Network
                  </p>
                  <p className="font-bold text-white font-brand-english tracking-wider">
                    Prem-Divas.in • Nexusflow Enterprises
                  </p>
                  <p className="text-[11px] text-white/60">
                    Parent Company & Registered Media Network
                  </p>
                </div>
              </div>
            </div>

            {/* Regional Music Language Chooser (4 cols) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-2.5">
                  <Globe className="w-4 h-4 text-amber-400" />
                  Select Regional Language
                </h4>
                <p className="text-xs text-white/60 mb-3">
                  Choose your preferred regional music language. All 9 ceremony categories and Spotify playlists will automatically switch to your chosen region!
                </p>

                {/* Regional Selector Switcher */}
                <div className="glass-pill rounded-2xl p-1.5 flex items-center gap-2 border border-amber-400/30 shadow-lg bg-black/40">
                  <button
                    onClick={() => onSelectRegion("hindi")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 border ${
                      currentRegion === "hindi"
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black border-amber-300 shadow-md scale-105"
                        : "text-white/70 hover:text-white border-transparent hover:bg-white/10"
                    }`}
                  >
                    <span className="text-sm">🇮🇳</span>
                    <span>Hindi Playlists</span>
                  </button>

                  <button
                    onClick={() => onSelectRegion("odia")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 border ${
                      currentRegion === "odia"
                        ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white border-rose-300 shadow-md scale-105"
                        : "text-white/70 hover:text-white border-transparent hover:bg-white/10"
                    }`}
                  >
                    <span className="text-sm">🌸</span>
                    <span>Odia Playlists</span>
                  </button>
                </div>

                <div className="mt-2.5 text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Active Region: {currentRegion === "odia" ? "Odia (ଓଡ଼ିଆ) Bahaghara Beats" : "Hindi (हिंदी) Shaadi Hits"}</span>
                </div>
              </div>
            </div>

            {/* Quick Links & Modals (3 cols) */}
            <div className="md:col-span-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-2.5">
                  Quick Navigation
                </h4>

                <ul className="space-y-2 text-xs font-medium text-white/80">
                  <li>
                    <button
                      onClick={onOpenSpotifyModal}
                      className="hover:text-emerald-300 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Music2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Spotify Sync & Custom Links</span>
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 transition-all flex items-center gap-1.5 text-emerald-400 font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Join WhatsApp Community</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Footer Bottom Copyright Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
            <p>© {new Date().getFullYear()} Prem-Divas.in • Nexusflow Enterprises. All Rights Reserved.</p>
            <p className="flex items-center gap-1 text-white/70">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>for Indian & Odia Weddings Worldwide</span>
            </p>
          </div>

        </div>
      )}
    </footer>
  );
};
