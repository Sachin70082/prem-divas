"use client";

import React, { useState, useRef, useEffect } from "react";
import { RASAM_THEMES, RasamTheme } from "@/data/rasams";
import {
  Sparkles,
  Grid,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  X,
  Check,
  Wand2,
} from "lucide-react";

interface RasamSelectorProps {
  currentTheme: RasamTheme;
  onSelectTheme: (theme: RasamTheme) => void;
  currentRegion?: "hindi" | "odia";
}

export const RasamSelector: React.FC<RasamSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  currentRegion = "hindi",
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredTheme, setHoveredTheme] = useState<RasamTheme | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOdia = currentRegion === "odia";

  const categories = [
    { id: "all", label: isOdia ? "ସବୁ ରସମ (All)" : "All Vibes" },
    { id: "wedding", label: isOdia ? "ନୀତି ଓ ପୂଜା (Ceremonies)" : "Ceremonies" },
    { id: "sangeet", label: isOdia ? "ସଙ୍ଗୀତ ଓ ନାଚ (Dance)" : "Dance & Party" },
    { id: "fun", label: isOdia ? "ସାଙ୍ଗ ମେଳା (Fun & Travel)" : "Fun & Travel" },
    { id: "divorce", label: isOdia ? "ତଲାକ୍ (Divorce & Heartbreak)" : "Divorce & Regret" },
  ];

  // Directly switch to Previous or Next Rasam Theme on Arrow Click & Scroll to it
  const handleSelectNextOrPrevTheme = (direction: "left" | "right") => {
    const currentIndex = RASAM_THEMES.findIndex((t) => t.id === currentTheme.id);
    let targetIndex = 0;
    if (direction === "left") {
      targetIndex = (currentIndex - 1 + RASAM_THEMES.length) % RASAM_THEMES.length;
    } else {
      targetIndex = (currentIndex + 1) % RASAM_THEMES.length;
    }

    const targetTheme = RASAM_THEMES[targetIndex];
    onSelectTheme(targetTheme);
  };

  // Auto-scroll active theme button into view with proper centering
  useEffect(() => {
    const currentIndex = RASAM_THEMES.findIndex((t) => t.id === currentTheme.id);
    if (scrollRef.current && currentIndex !== -1) {
      const activeBtn = scrollRef.current.children[currentIndex] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentTheme.id]);

  // Quick Random Shuffle
  const handleRandomSelect = () => {
    const remaining = RASAM_THEMES.filter((t) => t.id !== currentTheme.id);
    const randomTheme = remaining[Math.floor(Math.random() * remaining.length)];
    onSelectTheme(randomTheme);
  };

  // Filter themes based on category tab
  const filteredThemes = RASAM_THEMES.filter((theme) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "wedding")
      return ["prewedding", "wedding", "haldi", "mehendi", "bidaayi"].includes(theme.id);
    if (activeCategory === "sangeet")
      return ["sangeet", "reception", "suhagraat"].includes(theme.id);
    if (activeCategory === "fun")
      return ["bus"].includes(theme.id);
    if (activeCategory === "divorce")
      return ["divorce"].includes(theme.id);
    return true;
  });

  return (
    <>
      {/* ULTRA-MODERN LUXURY GLASS CAPSULE NAVIGATION MENU */}
      <div className="w-full max-w-6xl mx-auto px-3 md:px-6 z-30 select-none my-1 relative">
        <div className="relative rounded-full p-1.5 border border-amber-400/30 shadow-[0_15px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl bg-zinc-950/75 transition-all duration-500 hover:border-amber-400/60">
          
          {/* Dynamic Ambient Theme Glow Halo */}
          <div
            className="absolute -inset-1 rounded-full opacity-35 blur-2xl transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: currentTheme.glowColor || "rgba(245, 158, 11, 0.4)" }}
          />

          <div className="relative flex items-center justify-between gap-1.5 z-10">
            
            {/* Middle Scrollable Themes Carousel - Arrow Buttons DIRECTLY CHANGE Theme */}
            <div className="flex items-center flex-1 min-w-0 mx-0.5">
              {/* Left Arrow Button (Directly switches to Previous Theme) */}
              <button
                onClick={() => handleSelectNextOrPrevTheme("left")}
                title="Previous Category"
                className="flex shrink-0 w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-amber-500 hover:text-black border border-amber-400/40 items-center justify-center text-amber-300 transition-all shadow-md cursor-pointer active:scale-90 mr-1.5"
              >
                <ChevronLeft className="w-4.5 h-4.5 stroke-[3]" />
              </button>

              {/* Scrollable Category Menu Buttons Container */}
              <div
                ref={scrollRef}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-2 scroll-smooth min-w-0 flex-1"
              >
                {RASAM_THEMES.map((theme) => {
                  const isActive = currentTheme.id === theme.id;
                  const displayTileTitle = isOdia ? theme.odiaTitle : theme.name;

                  return (
                    <button
                      key={theme.id}
                      onClick={() => onSelectTheme(theme)}
                      onMouseEnter={() => setHoveredTheme(theme)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer active:scale-95 border ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-white border-amber-300 shadow-lg shadow-amber-500/30 scale-105 ring-1 ring-amber-300"
                          : "bg-zinc-900/70 hover:bg-zinc-800/90 text-white/80 hover:text-white border-white/10 hover:border-amber-400/50 backdrop-blur-md"
                      }`}
                    >
                      {/* Image Thumbnail Avatar */}
                      <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-sm bg-amber-500/20 flex items-center justify-center">
                        <img
                          src={theme.bgImage}
                          alt={theme.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <span className={`tracking-wide ${isOdia ? "font-odia font-bold text-xs text-white" : "font-bold text-xs"}`}>
                        {displayTileTitle}
                      </span>

                      {/* Active Indicator Pulse Dot */}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping inline-block" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button (Directly switches to Next Theme) */}
              <button
                onClick={() => handleSelectNextOrPrevTheme("right")}
                title="Next Category"
                className="flex shrink-0 w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-amber-500 hover:text-black border border-amber-400/40 items-center justify-center text-amber-300 transition-all shadow-md cursor-pointer active:scale-90 ml-1.5"
              >
                <ChevronRight className="w-4.5 h-4.5 stroke-[3]" />
              </button>
            </div>

            {/* Right Action Button (Gallery Drawer Modal Toggle) */}
            <div className="flex items-center pl-1 shrink-0">
              <div className="w-[1px] h-6 bg-white/20 mx-1 shrink-0 hidden sm:block" />
              
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500 hover:to-rose-500 text-amber-300 hover:text-white border border-amber-400/40 hover:border-amber-300 transition-all duration-300 cursor-pointer active:scale-95 shadow-xl group"
              >
                <Grid className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
                <span className="hidden md:inline font-bold">Gallery View</span>
                <span className="md:hidden font-bold">All BG</span>
              </button>
            </div>

          </div>
        </div>

        {/* Desktop Hover Micro Card Preview */}
        {hoveredTheme && (
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full mt-3 z-40 pointer-events-none transition-all duration-300 animate-in fade-in zoom-in-95">
            <div className="glass-card rounded-3xl p-3 border border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-72 text-center backdrop-blur-3xl bg-black/80">
              <div className="relative w-full h-28 rounded-2xl overflow-hidden mb-2 border border-white/20">
                <img
                  src={hoveredTheme.bgImage}
                  alt={hoveredTheme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-bold text-amber-300 font-devanagari">
                  {isOdia ? hoveredTheme.odiaTitle : hoveredTheme.hindiTitle}
                </span>
                <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white/80 border border-white/20">
                  {hoveredTheme.name}
                </span>
              </div>
              <p className="text-xs text-white/90 line-clamp-2 italic font-devanagari px-1">
                "{isOdia ? hoveredTheme.odiaQuote : hoveredTheme.quote}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* High-Definition Gallery Drawer / Modal Overlay */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[85vh] glass-card rounded-3xl border border-white/25 p-5 md:p-7 overflow-hidden flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.9)] bg-black/80">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/40">
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2 font-devanagari">
                    <span>{isOdia ? "ବାହାଘର ସୁନ୍ଦର ୱାଲପେପର (Wallpaper Gallery)" : "Wedding Background Gallery"}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-sans font-bold">
                      {RASAM_THEMES.length} Themes
                    </span>
                  </h3>
                  <p className="text-xs text-white/70 font-devanagari">
                    {isOdia ? "ଓଡ଼ିଆ ବାହାଘର ନୀତି ଓ ପୂଜା ରସମ ୱାଲପେପର" : "Click any wallpaper to switch live background and Spotify playlist"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsGalleryOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 border border-white/15 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2.5 my-4 overflow-x-auto no-scrollbar pb-1 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border font-devanagari ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black border-amber-300 font-extrabold shadow-lg shadow-amber-500/30 scale-105"
                      : "bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Theme Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto no-scrollbar pr-1 my-2 flex-1">
              {filteredThemes.map((theme) => {
                const isActive = currentTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => {
                      onSelectTheme(theme);
                      setIsGalleryOpen(false);
                    }}
                    className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col ${
                      isActive
                        ? "border-amber-400 ring-2 ring-amber-400 shadow-2xl shadow-amber-500/40 scale-[1.02]"
                        : "border-white/15 hover:border-white/40 hover:scale-[1.02]"
                    }`}
                  >
                    {/* Card Background Preview Image */}
                    <div className="relative h-40 w-full overflow-hidden bg-zinc-950">
                      <img
                        src={theme.bgImage}
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                      {/* Active Badge */}
                      {isActive && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-xl">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>LIVE</span>
                        </div>
                      )}

                      {/* Subtitle tag */}
                      <span className="absolute top-3 left-3 text-[9px] font-bold text-amber-200 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/10 uppercase">
                        {isOdia ? theme.odiaSubTitle : theme.subTitle}
                      </span>

                      {/* Bottom Title inside image */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-base font-extrabold text-white leading-tight drop-shadow-md">
                          {isOdia ? theme.odiaTitle : theme.name}
                        </h4>
                        <p className="text-xs font-semibold text-amber-300 truncate">
                          {isOdia ? theme.name : theme.hindiTitle}
                        </p>
                      </div>
                    </div>

                    {/* Quote Snippet Body */}
                    <div className="bg-black/80 p-3.5 flex-1 flex flex-col justify-between border-t border-white/10">
                      <p className="text-xs text-white/80 line-clamp-2 italic font-devanagari mb-2">
                        "{isOdia ? theme.odiaQuote : theme.quote}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-white/60 pt-2 border-t border-white/10 font-devanagari">
                        <span>{isOdia ? theme.odiaAuthor : theme.author}</span>
                        <span className="text-amber-400 group-hover:underline font-bold">
                          Apply BG →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0 text-xs text-white/70">
              <span className="flex items-center gap-2 font-devanagari">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isOdia ? "ୱାଲପେପର ବଦଳାଇବା ପାଇଁ କ୍ଲିକ୍ କରନ୍ତୁ" : "Click any theme card to change live background & Spotify playlist"}</span>
              </span>

              <button
                onClick={() => setIsGalleryOpen(false)}
                className="px-5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/15"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
