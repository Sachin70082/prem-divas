import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prem-Divas.in • Premium Royal Wedding & Bahaghara Spotify Jukebox",
  description:
    "Prem-Divas.in — Listen to Hindi & Odia Bahaghara wedding songs, haldi, mehendi, sangeet & baraat playlists synced directly with Spotify. Fullscreen high-definition background wallpapers for every Indian wedding occasion.",
  keywords: [
    "Prem-Divas.in",
    "Prem Divas Wedding Music",
    "Odia Bahaghara Playlist",
    "Spotify Wedding Playlist",
    "Haldi Rasam Songs",
    "Mehendi Songs",
    "Baraat Beats",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
