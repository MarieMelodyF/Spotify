import React, { useEffect, useState } from "react";
import { setAccessToken } from "./spotify";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPES,
} from "./authConfig";

import Home from "./Pages/home";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  // Function to redirect to sign in
  const loginWithSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      SPOTIFY_REDIRECT_URI
    )}&scope=${encodeURIComponent(SPOTIFY_SCOPES?.join(" "))}`;
    window.location.href = authUrl;
  };

  // Find token
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const _token = params.get("access_token");
      if (_token) {
        setToken(_token);
        setAccessToken(_token); // Set token in Spotify API
        window.location.hash = ""; // Nettoie l'URL
      }
    }
  }, []);

  return (
    <div>
      <Home token={token} loginWithSpotify={loginWithSpotify} />
    </div>
  );
};

export default App;
