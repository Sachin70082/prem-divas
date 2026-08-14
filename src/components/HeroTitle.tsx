"use client";

import React from "react";
import { RasamTheme } from "@/data/rasams";
import { Sparkles } from "lucide-react";

interface HeroTitleProps {
  theme: RasamTheme;
  currentRegion?: "hindi" | "odia";
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  theme,
  currentRegion = "hindi",
}) => {
  const isOdia = currentRegion === "odia";
  const displayTitle = isOdia ? theme.odiaTitle : theme.hindiTitle;
  const displaySubTitle = isOdia ? theme.odiaSubTitle : theme.subTitle;

  return (
    <div className="w-full text-center z-20 my-auto py-1 select-none px-3 sm:px-6 transition-all duration-700 animate-in fade-in zoom-in-95 max-w-5xl mx-auto">
      {/* Brand Header Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-zinc-950 via-purple-950/80 to-zinc-950 border border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-1 sm:mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
        <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-300 font-brand-english uppercase">PREM-DIVAS.IN</span>
      </div>

      {/* Responsive Scaling Royal Title for Mobile, Tablet & Desktop */}
      <h1
        className={`text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black ${
          isOdia ? "font-odia text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]" : "font-royal-title text-glow-gold bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
        } tracking-wide leading-tight break-words py-1`}
      >
        {displayTitle}
      </h1>

      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-3">
        <span className="h-[1.5px] w-8 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
        <p className={`text-[11px] sm:text-sm md:text-base font-extrabold ${isOdia ? "font-odia text-amber-200/90" : "font-cinzel-dec text-amber-200"} tracking-[0.15em] uppercase drop-shadow-md px-2`}>
          {displaySubTitle}
        </p>
        <span className="h-[1.5px] w-8 sm:w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-300" />
      </div>
    </div>
  );
};
