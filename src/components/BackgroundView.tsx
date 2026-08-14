"use client";

import React from "react";
import { RasamTheme } from "@/data/rasams";

interface BackgroundViewProps {
  currentTheme: RasamTheme;
  children: React.ReactNode;
  isFooterExpanded?: boolean;
}

export const BackgroundView: React.FC<BackgroundViewProps> = ({
  currentTheme,
  children,
  isFooterExpanded = false,
}) => {
  return (
    <div className={`relative ${isFooterExpanded ? "min-h-screen overflow-y-auto" : "h-screen max-h-screen overflow-hidden"} w-full bg-black text-white transition-all duration-500`}>
      {/* Full-screen background image container with smooth opacity crossfade */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={currentTheme.bgImage}
          alt={currentTheme.name}
          className="w-full h-full object-cover object-center transition-all duration-1000 scale-105"
        />

        {/* Ambient Overlay Gradient for legibility & warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/85" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70" />
      </div>

      {/* Main Content Layer */}
      <div className={`relative z-10 ${isFooterExpanded ? "min-h-screen pb-12" : "h-screen max-h-screen overflow-hidden"} flex flex-col justify-between py-1 transition-all duration-500`}>
        {children}
      </div>
    </div>
  );
};
