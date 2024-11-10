// export const SPOTIFY_CLIENT_ID = "cd91252789864440a432a0a8279b8e60";
// export const SPOTIFY_REDIRECT_URI = "http://localhost:3000";

// export const SPOTIFY_SCOPES = [
//   "user-library-read",
//   "playlist-read-private",
//   "playlist-read-collaborative",
//   "user-read-recently-played",
//   "user-top-read",
//   "user-read-email",
//   "user-read-private",
// ];

export const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const SPOTIFY_REDIRECT_URI = process.env
  .REACT_APP_SPOTIFY_REDIRECT_URI as string;
export const SPOTIFY_SCOPES = process.env.REACT_APP_SPOTIFY_SCOPES?.split(
  ","
) as string[];
