"use client";

import React from "react";
import { Quote } from "lucide-react";
import { RasamTheme } from "@/data/rasams";

interface ShayariQuoteCardProps {
  theme: RasamTheme;
  currentRegion?: "hindi" | "odia";
}

export const ShayariQuoteCard: React.FC<ShayariQuoteCardProps> = ({
  theme,
  currentRegion = "hindi",
}) => {
  const isOdia = currentRegion === "odia";
  const displayQuote = isOdia ? theme.odiaQuote : theme.quote;
  const displayAuthor = isOdia ? theme.odiaAuthor : theme.author;

  return (
    <div className="w-full max-w-xl mx-auto px-3 z-20 select-none my-1 transition-all duration-700">
      <div className="glass-card rounded-2xl p-2.5 sm:p-3 border border-white/15 text-center relative overflow-hidden shadow-xl backdrop-blur-xl group hover:border-amber-400/40 transition-all">
        {/* Subtle accent glow */}
        <div
          className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: theme.glowColor }}
        />

        <div className="flex justify-center mb-1 text-amber-300/80">
          <Quote className="w-5 h-5 rotate-180 opacity-70" />
        </div>

        <p className={`text-sm md:text-base ${isOdia ? "font-odia text-white font-semibold tracking-wide drop-shadow-sm" : "italic font-serif text-amber-100/90 font-medium"} leading-relaxed`}>
          &ldquo;{displayQuote}&rdquo;
        </p>

        <p className={`text-xs ${isOdia ? "font-odia text-amber-300 font-bold tracking-wide" : "font-sans text-amber-300/80 font-semibold tracking-wider"} mt-2 uppercase`}>
          — {displayAuthor}
        </p>
      </div>
    </div>
  );
};
