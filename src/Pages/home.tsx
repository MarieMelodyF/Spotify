import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import theme from "../theme";
import Sidebar from "../components/Sidebar";
import RecentlyPlayed from "../components/recentlyPlayed";
import { toggleSearch } from "../Functions/ToggleSearch";
import { fetchUserPlaylists } from "../Functions/Fetchs";
import TabPanel from "../components/TabPanel";
import TopItems from "../components/TopItems";
import BoxPanel from "../components/BoxPanel";

type HomeProps = {
  token: string | null;
  loginWithSpotify: () => void;
};

const Home: React.FC<HomeProps> = ({ token, loginWithSpotify }) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
            <BoxPanel maxwdith={400} borderRadius={0}>
              <Sidebar
                token={token}
                playlists={playlists}
                handleSearchClick={handleSearchClick}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
              />
            </BoxPanel>

            {/* Contenu à droite de la sidebar */}
            <Box
              sx={{
                flexGrow: 1,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                color: "text.primary",
                background:
                  "linear-gradient(to top, #191414, #168d40,  #1db954)",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="secondary"
              >
                <Tab label="Récent" {...a11yProps(0)} />
                <Tab label="Top item" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <RecentlyPlayed token={token} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TopItems token={token} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div>Item Three</div>
              </TabPanel>
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
            <Typography variant="h4" color="text.secondary" gutterBottom>
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
