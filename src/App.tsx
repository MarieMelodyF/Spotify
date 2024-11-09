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
  Drawer,
} from "@mui/material";
import theme from "./theme";
import Sidebar from "./components/Sidebar"; // Si tu veux afficher la Sidebar
import Content from "./components/YourLibrary";

const App: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Gérer l'ouverture/fermeture du Drawer

  // Fonction pour rediriger l'utilisateur vers Spotify pour l'authentification
  const loginWithSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      SPOTIFY_REDIRECT_URI
    )}&scope=${SPOTIFY_SCOPES.join("%20")}`;
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

  // Récupérer les playlists de l'utilisateur une fois connecté
  useEffect(() => {
    if (token) {
      spotifyApi.getUserPlaylists().then((response) => {
        setPlaylists(response.items);
      });
    }
  }, [token]);

  // Fonction pour ouvrir ou fermer le Drawer
  const toggleLibrary = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {token && (
          <Sidebar
            token={token}
            playlists={playlists}
            onLibraryToggle={toggleLibrary}
          />
        )}
        {/* Contenu principal */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!token && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
