export const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const SPOTIFY_REDIRECT_URI = process.env
  .REACT_APP_SPOTIFY_REDIRECT_URI as string;
export const SPOTIFY_SCOPES = process.env.REACT_APP_SPOTIFY_SCOPES?.split(
  ","
) as string[];
