"use client";

import React, { useState, useEffect } from "react";
import { RASAM_THEMES, RasamTheme } from "@/data/rasams";
import { WEDDING_SONGS, SongTrack, INITIAL_SPOTIFY_PLAYLIST_LINK } from "@/data/weddingSongs";
import { getPlaylistUrlForTheme } from "@/data/spotifyPlaylists";
import { BackgroundView } from "@/components/BackgroundView";
import { HeaderPills } from "@/components/HeaderPills";
import { RasamSelector } from "@/components/RasamSelector";
import { HeroTitle } from "@/components/HeroTitle";
import { ShayariQuoteCard } from "@/components/ShayariQuoteCard";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Footer } from "@/components/Footer";
import { SpotifySyncModal } from "@/components/SpotifySyncModal";
import { AmbientAudio } from "@/components/AmbientAudio";
import { AtishbajiSFX } from "@/components/AtishbajiSFX";
import { BidaayiSFX } from "@/components/BidaayiSFX";
import { WeddingWarningModal } from "@/components/WeddingWarningModal";
import { Sparkles, Music } from "lucide-react";

export default function Home() {
  // Default theme is Shaadi & Phere (wedding) - auto-selected on initial load
  const defaultWeddingTheme = RASAM_THEMES.find((t) => t.id === "wedding") || RASAM_THEMES[0];

  const [currentTheme, setCurrentTheme] = useState<RasamTheme>(defaultWeddingTheme);
  const [currentRegion, setCurrentRegion] = useState<"hindi" | "odia">("odia");
  const [songs, setSongs] = useState<SongTrack[]>(WEDDING_SONGS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isShuffleMode, setIsShuffleMode] = useState<boolean>(true);
  const [autoSwitch, setAutoSwitch] = useState<boolean>(false);
  const [ambientActive, setAmbientActive] = useState<boolean>(true);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  // Modals & Footer Expand
  const [isSpotifyModalOpen, setIsSpotifyModalOpen] = useState<boolean>(false);
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState<string>(INITIAL_SPOTIFY_PLAYLIST_LINK);
  const [isSyncingSpotify, setIsSyncingSpotify] = useState<boolean>(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState<boolean>(false);

  const handleToggleFooterExpand = () => {
    setIsFooterExpanded((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return next;
    });
  };

  const currentTrack = songs[currentTrackIndex] || WEDDING_SONGS[0];

  // Auto-start audio & autoplay on first touch/click anywhere on page
  useEffect(() => {
    const handleFirstUserGesture = () => {
      setHasUserInteracted(true);
      setIsPlaying(true);
      setAmbientActive(true);
    };

    window.addEventListener("click", handleFirstUserGesture, { once: true });
    window.addEventListener("touchstart", handleFirstUserGesture, { once: true });
    window.addEventListener("keydown", handleFirstUserGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstUserGesture);
      window.removeEventListener("touchstart", handleFirstUserGesture);
      window.removeEventListener("keydown", handleFirstUserGesture);
    };
  }, []);

  // Load theme & region specific Spotify playlist whenever currentTheme or currentRegion changes
  useEffect(() => {
    let isMounted = true;

    const loadThemePlaylist = async () => {
      let targetUrl = getPlaylistUrlForTheme(currentTheme.id, currentRegion);

      // Attempt reading live public/spotifyPlaylists.json for admin edits
      try {
        const res = await fetch("/spotifyPlaylists.json");
        if (res.ok) {
          const mapData = await res.json();
          if (mapData[currentTheme.id]?.[currentRegion]?.spotifyUrl) {
            targetUrl = mapData[currentTheme.id][currentRegion].spotifyUrl;
          }
        }
      } catch (e) {
        // Use static imported fallback
      }

      if (!isMounted) return;
      setSpotifyPlaylistUrl(targetUrl);

      // Fetch tracks matching the selected region & day / theme playlist
      try {
        const res = await fetch(
          `/api/spotify/playlist?playlist=${encodeURIComponent(targetUrl)}&theme=${currentTheme.id}&region=${currentRegion}`
        );
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.tracks && data.tracks.length > 0) {
            setSongs(data.tracks);
            setCurrentTrackIndex(0);
          }
        }
      } catch (err) {
        console.error("Failed to load playlist for theme & region:", err);
      }
    };

    loadThemePlaylist();

    return () => {
      isMounted = false;
    };
  }, [currentTheme.id, currentRegion]);

  // Auto theme switcher on track change if autoSwitch is active
  useEffect(() => {
    if (autoSwitch) {
      const randomTheme = RASAM_THEMES[Math.floor(Math.random() * RASAM_THEMES.length)];
      setCurrentTheme(randomTheme);
    }
  }, [currentTrackIndex, autoSwitch]);

  // Playback Control Handlers
  const handlePlayPauseToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextTrack = () => {
    if (isShuffleMode) {
      handlePlayRandomTrack();
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % songs.length);
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handlePlayRandomTrack = () => {
    if (songs.length <= 1) return;
    let randomIndex = currentTrackIndex;
    while (randomIndex === currentTrackIndex) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    setCurrentTrackIndex(randomIndex);
    setIsPlaying(true);
  };

  const handleSyncSpotifyPlaylist = async (url: string) => {
    setIsSyncingSpotify(true);
    setSpotifyPlaylistUrl(url);
    try {
      const res = await fetch(
        `/api/spotify/playlist?playlist=${encodeURIComponent(url)}&theme=${currentTheme.id}&region=${currentRegion}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.tracks && data.tracks.length > 0) {
          setSongs(data.tracks);
          setCurrentTrackIndex(0);
        }
      }
    } catch (err) {
      console.error("Failed to sync spotify playlist:", err);
    } finally {
      setIsSyncingSpotify(false);
    }
  };

  return (
    <BackgroundView currentTheme={currentTheme} isFooterExpanded={isFooterExpanded}>
      <AmbientAudio active={ambientActive} themeId={currentTheme.id} />

      {/* Auto-Play First Interaction Prompt Floating Bar */}
      {!hasUserInteracted && (
        <div
          onClick={() => {
            setHasUserInteracted(true);
            setIsPlaying(true);
            setAmbientActive(true);
          }}
          className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 text-black px-5 py-2 rounded-full font-black text-xs shadow-[0_10px_30px_rgba(16,185,129,0.8)] border border-white/60 animate-bounce cursor-pointer flex items-center gap-2 select-none"
        >
          <Music className="w-4 h-4 text-black animate-spin" />
          <span>✨ TAP ANYWHERE TO AUTO-START WEDDING MUSIC STREAM 🎶</span>
          <Sparkles className="w-4 h-4 text-black" />
        </div>
      )}

      {/* Top Header Pill Bar with Regional Language Toggle */}
      <HeaderPills
        onOpenSpotifyModal={() => setIsSpotifyModalOpen(true)}
        ambientActive={ambientActive}
        toggleAmbient={() => setAmbientActive(!ambientActive)}
        spotifyPlaylistUrl={spotifyPlaylistUrl}
        currentTrack={currentTrack}
        currentRegion={currentRegion}
        onSelectRegion={(r) => setCurrentRegion(r)}
      />

      {/* Background Mood / Rasam Toggle Pills */}
      <RasamSelector
        currentTheme={currentTheme}
        onSelectTheme={(theme) => setCurrentTheme(theme)}
        currentRegion={currentRegion}
      />

      {/* Center Hero Typography */}
      <div className="my-auto flex flex-col items-center justify-center">
        <HeroTitle theme={currentTheme} currentRegion={currentRegion} />

        {/* Atishbaji Sky Shot Sound SFX Button (Exclusive for Baraat & DJ Theme) */}
        {currentTheme.id === "bus" && (
          <AtishbajiSFX currentRegion={currentRegion} />
        )}

        {/* Bidaayi Crying Sound SFX Button (Exclusive for Bidaayi Hues Theme) */}
        {currentTheme.id === "bidaayi" && (
          <BidaayiSFX currentRegion={currentRegion} />
        )}

        {/* Dynamic Shayari Quote Card */}
        <ShayariQuoteCard theme={currentTheme} currentRegion={currentRegion} />
      </div>

      {/* Bottom Floating Music Player (100% Spotify Embed Mode + Modern Controls) */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPauseToggle={handlePlayPauseToggle}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onPlayRandomTrack={handlePlayRandomTrack}
        isShuffleMode={isShuffleMode}
        onToggleShuffleMode={() => setIsShuffleMode(!isShuffleMode)}
        trackIndex={currentTrackIndex}
        totalTracks={songs.length}
        spotifyPlaylistUrl={spotifyPlaylistUrl}
        currentRegion={currentRegion}
        onOpenSpotifyModal={() => setIsSpotifyModalOpen(true)}
      />

      {/* Modern Glassmorphic Footer */}
      <Footer
        onOpenSpotifyModal={() => setIsSpotifyModalOpen(true)}
        currentRegion={currentRegion}
        onSelectRegion={(r) => setCurrentRegion(r)}
        isExpanded={isFooterExpanded}
        onToggleExpand={handleToggleFooterExpand}
      />

      {/* Modals & Site Load Warning Popup */}
      <WeddingWarningModal currentRegion={currentRegion} />

      <SpotifySyncModal
        isOpen={isSpotifyModalOpen}
        onClose={() => setIsSpotifyModalOpen(false)}
        currentPlaylistUrl={spotifyPlaylistUrl}
        onSyncPlaylist={handleSyncSpotifyPlaylist}
        isLoading={isSyncingSpotify}
      />
    </BackgroundView>
  );
}
