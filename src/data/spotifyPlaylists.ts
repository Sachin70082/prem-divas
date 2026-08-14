import playlistsData from "./spotifyPlaylists.json";

export interface RegionPlaylistDetails {
  playlistName: string;
  spotifyUrl: string;
  description: string;
}

export interface ThemePlaylistConfig {
  themeId: string;
  themeName: string;
  hindi: RegionPlaylistDetails;
  odia: RegionPlaylistDetails;
}

export type PlaylistsConfigMap = Record<string, ThemePlaylistConfig>;

export const SPOTIFY_PLAYLISTS_CONFIG: PlaylistsConfigMap = playlistsData as unknown as PlaylistsConfigMap;

/**
 * Helper to get Spotify playlist URL for a given theme ID and region (hindi | odia)
 */
export function getPlaylistUrlForTheme(themeId: string, region: "hindi" | "odia" = "hindi"): string {
  const config = SPOTIFY_PLAYLISTS_CONFIG[themeId];
  if (config) {
    const regionConfig = config[region] || config["hindi"];
    if (regionConfig && regionConfig.spotifyUrl) {
      return regionConfig.spotifyUrl;
    }
  }
  return "https://open.spotify.com/playlist/37i9dQZF1DXaq13rmxLhP9";
}

/**
 * Helper to get theme playlist metadata for a region
 */
export function getPlaylistConfigForTheme(
  themeId: string,
  region: "hindi" | "odia" = "hindi"
): RegionPlaylistDetails | null {
  const config = SPOTIFY_PLAYLISTS_CONFIG[themeId];
  if (!config) return null;
  return config[region] || config["hindi"] || null;
}
