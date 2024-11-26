// import axios from "axios";
import spotifyApi from "../spotify";

const API_BASE_URL = "https://api.spotify.com/v1";

const fetchFromSpotify = async (endpoint: string, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }
  return response.json();
};

export const fetchUserProfile = () => {
  return fetchFromSpotify("/me");
};

// playlist endpoint
export const fetchUserPlaylists = async (token: string | null) => {
  if (token) {
    const response = await spotifyApi.getUserPlaylists();
    return response.items;
  }
  return [];
};

// playlist tracks endpoint
export const fetchPlaylistTracks = (playlistId: string) => {
  return fetchFromSpotify(`/playlists/${playlistId}/tracks`);
};

export const fetchRecentlyPlayed = async (token: string) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des titres récemment écoutés."
      );
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// masthead endpoint
// export const fetchMastheadData = async () => {
//   try {
//     const response = await fetch(
//       "https://www.spotify.com/api/masthead/v1/masthead?market=fr"
//     );
//     console.log("===>", response);

//     if (!response.ok) {
//       throw new Error("Erreur lors de la récupération des données Masthead.");
//     }

//     return response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const fetchMastheadData = async () => {
//   try {
//     const response = await axios.get(
//       `https://www.spotify.com/api/masthead/v1/masthead?market=fr` // URL du backend local
//     );
//     return response.data; // Retourner les données Masthead
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données Masthead", error);
//     throw error;
//   }
// };
