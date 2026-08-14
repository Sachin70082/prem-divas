"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Music2,
  HelpCircle,
  Info,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ExternalLink,
  Globe,
} from "lucide-react";

interface HeaderPillsProps {
  onOpenSpotifyModal: () => void;
  ambientActive: boolean;
  toggleAmbient: () => void;
  spotifyPlaylistUrl: string;
  currentTrack?: any;
  currentRegion: "hindi" | "odia";
  onSelectRegion: (region: "hindi" | "odia") => void;
}

export const HeaderPills: React.FC<HeaderPillsProps> = ({
  onOpenSpotifyModal,
  spotifyPlaylistUrl,
  currentRegion,
  onSelectRegion,
}) => {
  const [timeString, setTimeString] = useState<string>("");
  const [onlineCount, setOnlineCount] = useState<number>(1842);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Live time ticker
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time online user count fluctuation for live broadcast feel
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) - 3;
      setOnlineCount((prev) => Math.max(1200, prev + delta));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="w-full flex flex-col lg:flex-row items-center justify-between gap-2.5 px-3 sm:px-6 py-2.5 z-30 relative select-none">

      {/* Top Mobile Row: Clock & Live Audience Stats */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Brand Name Pill */}
          <div className="glass-pill px-3.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-black text-amber-300 shadow-lg border border-amber-400/60 shrink-0 bg-black/70">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="tracking-widest font-brand-english text-glow-gold uppercase text-[12px]">Prem-Divas.in</span>
          </div>

          <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white/90 shadow-lg border border-white/10 shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{timeString || "8:18 PM"}</span>
          </div>

          <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium text-white/90 shadow-lg border border-emerald-500/30 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              <strong className="text-emerald-300 font-extrabold font-mono text-xs">
                {onlineCount.toLocaleString()}
              </strong>{" "}
              <span className="hidden sm:inline text-white/80">guests online</span>
            </span>

            <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-emerald-500/40 uppercase tracking-wider">
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* ELEGANT REGIONAL LANGUAGE SWITCHER (HINDI / ODIA) */}
      <div className="glass-card rounded-full p-1.5 flex items-center gap-1.5 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.4)] bg-gradient-to-r from-zinc-950 via-purple-950/90 to-zinc-950 backdrop-blur-2xl shrink-0 my-0.5">
        <span className="text-[11px] uppercase font-black tracking-widest text-amber-300 px-2 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="hidden sm:inline">Region:</span>
        </span>

        <button
          onClick={() => onSelectRegion("hindi")}
          title="Switch to Hindi Wedding Songs & Playlists"
          className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-1.5 border ${currentRegion === "hindi"
              ? "bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-black border-amber-200 shadow-[0_0_18px_rgba(245,158,11,0.7)] scale-105 ring-2 ring-amber-300"
              : "text-zinc-300 hover:text-white border-white/10 hover:bg-white/15"
            }`}
        >
          <span className="text-sm">🇮🇳</span>
          <span>Hindi</span>
        </button>

        <button
          onClick={() => onSelectRegion("odia")}
          title="Switch to Odia (ଓଡ଼ିଆ) Bahaghara Songs & Playlists"
          className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-1.5 border ${currentRegion === "odia"
              ? "bg-gradient-to-r from-rose-500 via-pink-600 to-amber-400 text-white border-rose-200 shadow-[0_0_22px_rgba(244,63,94,0.8)] scale-105 ring-2 ring-rose-300"
              : "text-zinc-300 hover:text-white border-white/10 hover:bg-white/15"
            }`}
        >
          <span className="text-sm">🌸</span>
          <span>Odia (ଓଡ଼ିଆ)</span>
        </button>
      </div>

      {/* Right Side Navigation Pills */}
      <div className="flex items-center flex-wrap justify-center gap-1.5">
        <button
          onClick={onOpenSpotifyModal}
          className="glass-pill hover:glass-pill-active px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-1 cursor-pointer border-emerald-500/30 active:scale-95 shadow-lg shadow-emerald-950/20"
        >
          <Music2 className="w-3.5 h-3.5" />
          <span>Spotify Sync</span>
        </button>

        <button
          onClick={toggleFullscreenMode}
          title="Toggle Fullscreen"
          className="glass-pill hover:glass-pill-active p-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer active:scale-95"
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5 text-amber-300" /> : <Maximize className="w-3.5 h-3.5 text-white/80" />}
        </button>

        <a
          href={spotifyPlaylistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-pill bg-emerald-600/90 hover:bg-emerald-500 px-3 py-1 rounded-full text-xs font-semibold text-white transition-all flex items-center gap-1 cursor-pointer shadow-lg active:scale-95"
        >
          <span>Spotify</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </header>
  );
};
