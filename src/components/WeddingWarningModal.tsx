"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, HeartOff, Sparkles, X, ShieldAlert, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface WeddingWarningModalProps {
  currentRegion?: "hindi" | "odia";
}

export const WeddingWarningModal: React.FC<WeddingWarningModalProps> = ({
  currentRegion = "odia",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Show warning popup on site load automatically
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#e11d48", "#10b981", "#ffffff"],
      });
    } catch (e) {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300 select-none">
      {/* Warning Card Container */}
      <div className="relative w-full max-w-md rounded-3xl p-6 md:p-8 border-2 border-amber-400/80 shadow-[0_0_60px_rgba(245,158,11,0.5)] bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white overflow-hidden text-center backdrop-blur-2xl">
        
        {/* Glowing Background Radial Halos */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Badge & Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-yellow-400 p-0.5 flex items-center justify-center shadow-xl shadow-amber-500/40 mb-4 animate-bounce">
          <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-400 fill-amber-400/20" />
          </div>
        </div>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>IMPORTANT WEDDING WARNING</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        {/* Main Warning Quotes in Hindi & Odia */}
        <div className="space-y-4 my-3">
          {/* Hindi Warning */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 font-devanagari">
            <p className="text-lg md:text-xl font-black text-amber-300 tracking-wide">
              "अभी भी टाइम है... शादी मत करो!" ⚠️💍
            </p>
            <p className="text-xs text-amber-100/80 mt-1 font-sans">
              (Abhi bhi time he... Shadi mat karo!)
            </p>
          </div>

          {/* Odia Warning */}
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-400/30 text-rose-200">
            <p className="text-lg md:text-xl font-bold font-odia text-rose-200 tracking-wide">
              "ଏବେ ବି ସମୟ ଅଛି... ବାହାଘର ହୁଅ ନାହିଁ!" 🚨🚫
            </p>
            <p className="text-xs text-rose-100/80 mt-1 font-sans">
              (Ebe bi samaya achhi... Bahaghara hua nai!)
            </p>
          </div>
        </div>

        {/* Subtitle Humorous Text */}
        <p className="text-xs text-zinc-300/90 leading-relaxed font-medium mb-5 px-2">
          Proceed at your own risk! Once you enter, the Shaadi & Phere music will play forever! 🎶🕺
        </p>

        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full text-xs md:text-sm font-black tracking-wide bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 text-black border border-amber-200 shadow-lg shadow-amber-500/40 hover:scale-105 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 fill-black text-amber-400" />
            <span>Samajh Gaya / ବୁଝିଗଲି (Enter)</span>
          </button>

          <button
            onClick={handleClose}
            className="w-full sm:w-auto py-3 px-5 rounded-full text-xs font-bold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer active:scale-95"
          >
            🏃 Escape / ପଳାଅ
          </button>
        </div>

      </div>
    </div>
  );
};
