import spotifyApi from "../spotify";

export const fetchUserPlaylists = async (token: string | null) => {
  if (token) {
    const response = await spotifyApi.getUserPlaylists();
    return response.items;
  }
  return [];
};
