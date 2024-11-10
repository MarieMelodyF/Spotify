import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Button,
  Typography,
} from "@mui/material";
import theme from "../theme";
import Sidebar from "../components/Sidebar";
import RecentlyPlayed from "../components/recentlyPlayed";
import { toggleSearch } from "../Functions/ToggleSearch";
import { fetchUserPlaylists } from "../Functions/FetchUserPlaylist";

type HomeProps = {
  token: string | null;
  loginWithSpotify: () => void;
};

const Home: React.FC<HomeProps> = ({ token, loginWithSpotify }) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  // Retrieve user's playlists
  useEffect(() => {
    if (token) {
      fetchUserPlaylists(token).then(setPlaylists);
    }
  }, [token]);

  // hide or show search inpunt
  const handleSearchClick = () => {
    setSearchOpen(toggleSearch);
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

            {/* Contenu à droite de la sidebar */}
            <Box
              sx={{
                marginLeft: 55,
                flexGrow: 1,
                padding: 2,
              }}
            >
              <RecentlyPlayed token={token} />
            </Box>
          </Box>
        )}

        {/* Si non connecté */}
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

export default Home;
