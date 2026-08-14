import { NextResponse } from "next/server";
import { WEDDING_SONGS, SongTrack } from "@/data/weddingSongs";
import { SPOTIFY_PLAYLISTS_CONFIG } from "@/data/spotifyPlaylists";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistUrl = searchParams.get("playlist") || "";
  const themeId = searchParams.get("theme") || "wedding";
  const region = (searchParams.get("region") || "hindi").toLowerCase() as "hindi" | "odia";

  // Helper to extract Spotify Playlist ID from URL or return string directly
  let playlistId = playlistUrl.trim();
  if (playlistId.includes("spotify.com/playlist/")) {
    const match = playlistId.match(/playlist\/([a-zA-Z0-9]+)/);
    if (match) {
      playlistId = match[1];
    }
  }

  // Get theme playlist metadata for active region if available
  const themeConfig = SPOTIFY_PLAYLISTS_CONFIG[themeId];
  const regionDetails = themeConfig ? themeConfig[region] || themeConfig["hindi"] : null;

  // If client passes custom Spotify credentials or client ID in process.env, we can use Spotify Web API
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (clientId && clientSecret && playlistId) {
    try {
      // 1. Get Spotify Access Token using Client Credentials Flow
      const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
        cache: "no-store",
      });

      if (tokenRes.ok) {
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // 2. Fetch Playlist Tracks from Spotify API
        const playlistRes = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}?fields=name,owner(display_name),tracks.items(track(id,name,artists,album(name,images),duration_ms,preview_url,external_urls,uri))`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            next: { revalidate: 60 },
          }
        );

        if (playlistRes.ok) {
          const playlistData = await playlistRes.json();
          const fetchedTracks: SongTrack[] = playlistData.tracks.items
            .filter((item: any) => item && item.track)
            .map((item: any, index: number) => {
              const track = item.track;
              const artistNames = track.artists.map((a: any) => a.name).join(", ");
              const cover = track.album?.images?.[0]?.url || WEDDING_SONGS[index % WEDDING_SONGS.length].coverUrl;
              const audioUrl = track.preview_url || WEDDING_SONGS[index % WEDDING_SONGS.length].audioUrl;

              return {
                id: `sp-${track.id}-${index}`,
                title: track.name,
                artist: artistNames,
                album: track.album?.name || "Single",
                region: region === "odia" ? "Odia" : "Hindi",
                rasamCategory: themeId,
                duration: Math.round(track.duration_ms / 1000),
                coverUrl: cover,
                audioUrl: audioUrl,
                spotifyUrl: track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}`,
                spotifyUri: track.uri || `spotify:track:${track.id}`,
              };
            });

          return NextResponse.json({
            success: true,
            source: "spotify-api",
            playlistName: playlistData.name || regionDetails?.playlistName || "Wedding Spotify Playlist",
            owner: playlistData.owner?.display_name || "Wedding DJ",
            playlistId: playlistId,
            tracks: fetchedTracks.length > 0 ? fetchedTracks : WEDDING_SONGS,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching Spotify API:", error);
    }
  }

  // Filter & sort tracks matching selected region & theme
  const targetRegionName = region === "odia" ? "Odia" : "Hindi";
  
  let sortedSongs = [...WEDDING_SONGS];

  sortedSongs.sort((a, b) => {
    const aRegionMatch = a.region.toLowerCase().includes(region);
    const bRegionMatch = b.region.toLowerCase().includes(region);

    if (aRegionMatch && !bRegionMatch) return -1;
    if (!aRegionMatch && bRegionMatch) return 1;

    const aThemeMatch = a.rasamCategory === themeId;
    const bThemeMatch = b.rasamCategory === themeId;

    if (aThemeMatch && !bThemeMatch) return -1;
    if (!aThemeMatch && bThemeMatch) return 1;

    return 0;
  });

  return NextResponse.json({
    success: true,
    source: "preset-fallback",
    playlistName: regionDetails?.playlistName || `VIVAAH RADIO • ${targetRegionName} Wedding Hits`,
    owner: "Vivaah DJ Crew",
    playlistId: playlistId || "37i9dQZF1DXaq13rmxLhP9",
    tracks: sortedSongs,
  });
}
