import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import YourLibrary from "./YourLibrary";
interface ContentProps {
  token: string | null;
  playlists: any[];
}

interface SidebarProps {
  token: string | null;
  playlists: any[];
  onLibraryToggle: (open: boolean) => void; // Fonction pour gérer l'ouverture/fermeture
}

const Sidebar: React.FC<SidebarProps> = ({
  token,
  playlists,
  onLibraryToggle,
}) => {
  return (
    <Box
      sx={{
        width: 400,
        bgcolor: "background.paper",
        height: "100vh",
        padding: 2,
        position: "fixed", // La sidebar reste fixe sur le côté
      }}
    >
      <Typography variant="h6" gutterBottom>
        My Spotify
      </Typography>
      <Button
        startIcon={<HomeIcon />}
        color="primary"
        fullWidth
        sx={{ justifyContent: "flex-start" }}
      >
        Home
      </Button>
      <Button
        startIcon={<SearchIcon />}
        color="primary"
        fullWidth
        sx={{ justifyContent: "flex-start" }}
      >
        Search
      </Button>
      <Box width={"auto"}>
        <YourLibrary token={token} playlists={playlists} />
      </Box>
    </Box>
  );
};

export default Sidebar;
