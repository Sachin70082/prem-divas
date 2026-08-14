"use client";

import React, { useState } from "react";
import { HeartHandshake, Volume2, VolumeX, ExternalLink, Heart, Square } from "lucide-react";

interface BidaayiSFXProps {
  currentRegion?: "hindi" | "odia";
}

export const BidaayiSFX: React.FC<BidaayiSFXProps> = ({
  currentRegion = "hindi",
}) => {
  const [isPlayingSFX, setIsPlayingSFX] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const youtubeVideoId = "GtFt7HXBCnM";

  const isOdia = currentRegion === "odia";

  const toggleBidaayiSFX = () => {
    if (isPlayingSFX) {
      // STOP SFX
      setIsPlayingSFX(false);
      setIframeKey(0);
    } else {
      // PLAY SFX
      setIsPlayingSFX(true);
      setIframeKey(Date.now());
    }
  };

  return (
    <div className="relative my-3 z-30 flex flex-col items-center justify-center select-none">
      {/* Hidden YouTube Audio Iframe for GtFt7HXBCnM */}
      {isPlayingSFX && iframeKey > 0 && (
        <iframe
          key={iframeKey}
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&enablejsapi=1&controls=0`}
          allow="autoplay"
          className="hidden w-0 h-0 opacity-0 pointer-events-none"
          title="Bidaayi Crying Sound SFX YouTube Audio"
        />
      )}

      {/* Bidaayi Crying SFX Button */}
      <button
        onClick={toggleBidaayiSFX}
        className={`group relative flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black tracking-wider transition-all duration-300 cursor-pointer active:scale-95 border shadow-[0_10px_35px_rgba(225,29,72,0.6)] backdrop-blur-2xl ${
          isPlayingSFX
            ? "bg-gradient-to-r from-rose-600 via-red-600 to-pink-500 text-white border-rose-300 ring-4 ring-rose-500/80 scale-105"
            : "bg-gradient-to-r from-rose-900/50 via-red-950/50 to-orange-950/50 hover:from-rose-600 hover:to-rose-800 text-rose-200 hover:text-white border-rose-500/70 hover:border-rose-400 hover:scale-105"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          {isPlayingSFX ? (
            <Square className="w-4 h-4 text-white fill-white" />
          ) : (
            <Heart className="w-4.5 h-4.5 text-white fill-white animate-pulse" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="font-extrabold text-sm flex items-center gap-1.5 font-devanagari">
            <span>😢 {isOdia ? "ବିଦାୟୀ କାନ୍ଦଣା SFX" : "विदाई रोने की धुन SFX"}</span>
            {isPlayingSFX ? <Volume2 className="w-4 h-4 text-white animate-bounce" /> : <VolumeX className="w-3.5 h-3.5 text-rose-300" />}
          </span>
          <span className="text-[10px] text-rose-200/90 font-medium font-devanagari">
            {isPlayingSFX
              ? "⏹️ Click again to STOP SFX"
              : isOdia
              ? "Bidaayi Crying Sound • Click to Play"
              : "Bidaayi Crying Sound • Click to Play"}
          </span>
        </div>

        <HeartHandshake className="w-4 h-4 text-rose-300 ml-1" />
      </button>

      {/* External link to original YouTube Bidaayi Crying video */}
      <a
        href={`https://youtu.be/${youtubeVideoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-rose-300/80 hover:text-rose-200 transition-colors"
      >
        <span>Original Bidaayi SFX Source (YouTube)</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};
