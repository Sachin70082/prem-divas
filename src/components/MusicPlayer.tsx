"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Radio, ExternalLink, Sparkles, Music2 } from "lucide-react";
import { SongTrack } from "@/data/weddingSongs";

interface MusicPlayerProps {
  currentTrack?: SongTrack;
  isPlaying?: boolean;
  onPlayPauseToggle?: () => void;
  onNextTrack?: () => void;
  onPrevTrack?: () => void;
  onPlayRandomTrack?: () => void;
  isShuffleMode?: boolean;
  onToggleShuffleMode?: () => void;
  trackIndex?: number;
  totalTracks?: number;
  spotifyPlaylistUrl?: string;
  currentRegion?: "hindi" | "odia";
  onOpenSpotifyModal?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  spotifyPlaylistUrl = "https://open.spotify.com/playlist/1BKZ94YeLx848XkdK29NXk",
  currentRegion = "odia",
  onOpenSpotifyModal,
}) => {

  // Trigger celebration confetti when Spotify playlist updates
  useEffect(() => {
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#10b981", "#f59e0b", "#e11d48", "#ffffff"],
      });
    } catch (e) {}
  }, [spotifyPlaylistUrl]);

  // Extract exact Spotify Playlist or Track ID for official iFrame embed
  const getSpotifyEmbedUrl = () => {
    if (spotifyPlaylistUrl) {
      const match = spotifyPlaylistUrl.match(/playlist\/([a-zA-Z0-9]+)/);
      if (match && match[1]) {
        return `https://open.spotify.com/embed/playlist/${match[1]}?utm_source=generator&theme=0&autoplay=1`;
      }
    }
    return `https://open.spotify.com/embed/playlist/4ntiUYHbVFMBakXUN7Hzwe?utm_source=generator&theme=0&autoplay=1`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-3 md:px-4 z-30 select-none my-1 transition-all">
      {/* Sleek Glassmorphic Container for Official Spotify Player */}
      <div className="glass-card rounded-3xl p-2.5 md:p-3 border border-emerald-500/40 shadow-[0_15px_45px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-2xl bg-gradient-to-b from-zinc-900/90 via-black/95 to-zinc-950/90">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between text-xs md:text-sm text-white/90 mb-2 pb-1.5 border-b border-white/10">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
            <span className="font-extrabold tracking-wider uppercase text-[11px] text-emerald-300">
              OFFICIAL SPOTIFY LIVE PLAYER
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] md:text-[11px] font-extrabold px-3 py-1 rounded-full uppercase">
              {currentRegion === "odia" ? "🌸 Odia Playlist" : "🇮🇳 Hindi Playlist"}
            </span>

            {onOpenSpotifyModal && (
              <button
                onClick={onOpenSpotifyModal}
                className="glass-pill hover:glass-pill-active text-[10px] md:text-[11px] font-bold text-amber-300 hover:text-white px-3 py-1 rounded-full border border-amber-400/40 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md"
              >
                <Music2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Custom Playlist</span>
              </button>
            )}
          </div>
        </div>

        {/* Pure Official Spotify Embed Player (Features native Play/Pause, Next/Prev, Cover Art, Seekbar) */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/40 bg-black/90">
          <iframe
            src={getSpotifyEmbedUrl()}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl"
          />

          {/* Top-Right Creator Name Masking Badge */}
          <div className="absolute top-0 right-0 h-12 w-52 bg-gradient-to-l from-zinc-950 via-zinc-950/95 to-transparent pointer-events-none z-10 flex items-center justify-end pr-3">
            <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase font-brand-english bg-black/90 px-2.5 py-1 rounded-full border border-amber-400/50 shadow-md">
              PREM-DIVAS.IN LIVE
            </span>
          </div>
        </div>

        {/* Footer Info Bar */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/10 text-xs text-white/80">
          <span className="flex items-center gap-2 font-semibold truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin" />
            <span className="truncate">Official Spotify Player • Native Controls & HQ Stream</span>
          </span>

          <a
            href={spotifyPlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-extrabold transition-all hover:underline shrink-0"
          >
            <span>Open in Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
