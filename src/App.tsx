import React, { useEffect, useState } from "react";
import spotifyApi, { setAccessToken } from "./spotify";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPES,
} from "./authConfig";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Button,
  Typography,
} from "@mui/material";
import theme from "./theme";
import Sidebar from "./components/Sidebar"; // Si tu veux afficher la Sidebar
import RecentlyPlayed from "./Pages/recentlyPlayed"; // Ajouter RecentlyPlayed ici

const App: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Fonction pour rediriger l'utilisateur vers Spotify pour l'authentification
  const loginWithSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      SPOTIFY_REDIRECT_URI
    )}&scope=${encodeURIComponent(SPOTIFY_SCOPES?.join(" "))}`;
    window.location.href = authUrl;
  };

  // Récupérer le token d'accès depuis l'URL après la redirection
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

  // Find user playlist
  useEffect(() => {
    if (token) {
      spotifyApi.getUserPlaylists().then((response) => {
        setPlaylists(response.items);
      });
    }
  }, [token]);

  // Open or hide search bar
  const handleSearchClick = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {token && (
          <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Sidebar à gauche */}
            <Box
              sx={{
                width: 300,
                padding: 2,
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                overflowY: "auto",
              }}
            >
              <Sidebar
                token={token}
                playlists={playlists}
                handleSearchClick={handleSearchClick}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
              />
            </Box>

            {/* Contenu principal à droite */}
            <Box
              sx={{
                marginLeft: 55,
                flexGrow: 1,
                padding: 2,
                // overflowY: "auto",
              }}
            >
              <RecentlyPlayed token={token} />
              <Typography>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
                assumenda earum, voluptatem dolore laborum ducimus ab aspernatur
                quidem ullam aut repudiandae est soluta molestiae vero dolorem!
                Rem quia accusantium adipisci!
              </Typography>
            </Box>
          </Box>
        )}

        {/* Contenu principal si pas connecté */}
        {!token && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <Typography variant="h4" color="text.primary" gutterBottom>
              Connectez-vous à Spotify
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={loginWithSpotify}
            >
              Se connecter avec Spotify
            </Button>
          </Box>
        )}
      </ThemeProvider>
    </div>
  );
};

export default App;
