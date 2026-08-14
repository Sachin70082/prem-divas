"use client";

import React, { useState } from "react";
import { Sparkles, Flame, Volume2, VolumeX, ExternalLink, Square } from "lucide-react";

interface AtishbajiSFXProps {
  currentRegion?: "hindi" | "odia";
}

export const AtishbajiSFX: React.FC<AtishbajiSFXProps> = ({
  currentRegion = "hindi",
}) => {
  const [isPlayingSFX, setIsPlayingSFX] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const youtubeVideoId = "YsP90tACSh0";

  const isOdia = currentRegion === "odia";

  const toggleAtishbajiSFX = () => {
    if (isPlayingSFX) {
      // STOP SFX
      setIsPlayingSFX(false);
      setIframeKey(0);
      setParticles([]);
    } else {
      // PLAY SFX (Simultaneous playback along with Spotify playlist)
      setIsPlayingSFX(true);
      setIframeKey(Date.now());

      // Spawn colorful visual fireworks particles
      const colors = ["#f59e0b", "#ef4444", "#ec4899", "#10b981", "#3b82f6", "#8b5cf6", "#facc15"];
      const newParticles = Array.from({ length: 18 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 280,
        y: (Math.random() - 0.8) * 240,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setParticles(newParticles);
    }
  };

  return (
    <div className="relative my-3 z-30 flex flex-col items-center justify-center select-none">
      {/* YouTube Audio Iframe for YsP90tACSh0 (Plays concurrently with Spotify) */}
      {isPlayingSFX && iframeKey > 0 && (
        <iframe
          key={iframeKey}
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&enablejsapi=1&controls=0`}
          allow="autoplay"
          className="hidden w-0 h-0 opacity-0 pointer-events-none"
          title="Sky Shot Sound SFX YouTube Audio"
        />
      )}

      {/* Atishbaji Sky Shot SFX Button */}
      <button
        onClick={toggleAtishbajiSFX}
        className={`group relative flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black tracking-wider transition-all duration-300 cursor-pointer active:scale-95 border shadow-[0_10px_35px_rgba(245,158,11,0.6)] backdrop-blur-2xl ${
          isPlayingSFX
            ? "bg-gradient-to-r from-amber-500 via-rose-500 to-yellow-400 text-black border-amber-300 ring-4 ring-amber-400/80 scale-105"
            : "bg-gradient-to-r from-amber-500/40 via-rose-500/40 to-purple-600/40 hover:from-amber-500 hover:to-rose-600 text-amber-200 hover:text-white border-amber-400/70 hover:border-amber-300 hover:scale-105"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
          {isPlayingSFX ? (
            <Square className="w-4 h-4 text-black fill-black" />
          ) : (
            <Flame className="w-4.5 h-4.5 text-black fill-black animate-pulse" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="font-extrabold text-sm flex items-center gap-1.5 font-devanagari">
            <span>🎆 {isOdia ? "ବାଣ ଫୋଟକା SFX" : "आतिशबाज़ी SFX"}</span>
            {isPlayingSFX ? <Volume2 className="w-4 h-4 text-black animate-bounce" /> : <VolumeX className="w-3.5 h-3.5 text-amber-300" />}
          </span>
          <span className="text-[10px] text-amber-100/90 font-medium font-devanagari">
            {isPlayingSFX
              ? "⏹️ Playing with Playlist • Click to Stop"
              : isOdia
              ? "Sky Shot Sound • Click to Play"
              : "Sky Shot Firecracker Sound • Click to Play"}
          </span>
        </div>

        <Sparkles className="w-4 h-4 text-amber-300 animate-spin ml-1" />
      </button>

      {/* External link to original YouTube Sky Shot video */}
      <a
        href={`https://youtu.be/${youtubeVideoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-amber-300/80 hover:text-amber-200 transition-colors"
      >
        <span>Original SFX Source (YouTube)</span>
        <ExternalLink className="w-3 h-3" />
      </a>

      {/* Visual Fireworks Particle Burst Animation */}
      {particles.length > 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute w-3.5 h-3.5 rounded-full animate-ping shadow-lg"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 18px ${p.color}`,
                transform: `translate(${p.x}px, ${p.y}px)`,
                transition: "all 1.5s ease-out",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
