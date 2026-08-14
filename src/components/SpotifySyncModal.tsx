"use client";

import React, { useState } from "react";
import { X, Music2, RefreshCw, CheckCircle2, Link as LinkIcon, Sparkles, ExternalLink } from "lucide-react";

interface SpotifySyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlaylistUrl: string;
  onSyncPlaylist: (url: string) => Promise<void>;
  isLoading: boolean;
}

export const SpotifySyncModal: React.FC<SpotifySyncModalProps> = ({
  isOpen,
  onClose,
  currentPlaylistUrl,
  onSyncPlaylist,
  isLoading,
}) => {
  const [playlistInput, setPlaylistInput] = useState<string>(currentPlaylistUrl);
  const [successMessage, setSuccessMessage] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistInput.trim()) return;
    setSuccessMessage("");
    await onSyncPlaylist(playlistInput.trim());
    setSuccessMessage("Spotify playlist synced successfully! New tracks updated.");
  };

  const handleSelectPreset = async (url: string) => {
    setPlaylistInput(url);
    setSuccessMessage("");
    await onSyncPlaylist(url);
    setSuccessMessage("Preset Spotify playlist loaded & synced!");
  };

  const PRESETS = [
    {
      name: "Punjabi Baraat & Dhol Beats",
      url: "https://open.spotify.com/playlist/37i9dQZF1DXaq13rmxLhP9",
      badge: "Baraat Special",
    },
    {
      name: "Bollywood Grand Wedding Dhun",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX2x59eZ81jH2",
      badge: "Trending",
    },
    {
      name: "Rajasthani & Marwadi Shaadi Folk",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX9u49eZ81jH3",
      badge: "Regional Folk",
    },
    {
      name: "Retro 90s Indian Wedding Nostalgia",
      url: "https://open.spotify.com/playlist/37i9dQZF1DXb4u4eZ81jH4",
      badge: "Classic 90s",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 border border-white/20 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Music2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Spotify Playlist Live Sync</h3>
            <p className="text-xs text-white/70">Connect your custom Spotify playlist for automatic updates</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1.5">
              Spotify Playlist Link or ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={playlistInput}
                onChange={(e) => setPlaylistInput(e.target.value)}
                placeholder="https://open.spotify.com/playlist/..."
                className="w-full pl-9 pr-4 py-2.5 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-emerald-400 transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Syncing Spotify Playlist...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Sync Spotify Playlist</span>
              </>
            )}
          </button>
        </form>

        {successMessage && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Info box explaining Spotify auto-reflect feature */}
        <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How Live Playlist Sync Works:</span>
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed">
            As developers or website hosts add new wedding tracks to your Spotify playlist, this site automatically fetches and streams the latest tracks in real-time!
          </p>
        </div>

        {/* Preset Playlists */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
            Or Choose Indian Wedding Playlist Presets:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset.url)}
                className="text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-emerald-400/50 transition-all text-xs cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white group-hover:text-emerald-300 truncate">
                    {preset.name}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono mt-0.5 inline-block">
                  {preset.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
