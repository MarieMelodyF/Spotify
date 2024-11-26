import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Typography, TextField, Stack, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import YourLibrary from "./YourLibrary";
import BoxPanel from "./BoxPanel";

interface SidebarProps {
  token: string | null;
  playlists: any[];
  handleSearchClick: () => void;
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  token,
  playlists,
  handleSearchClick,
  searchOpen,
  setSearchOpen,
}) => {
  const [searchPlaylist, setSearchPlaylist] = useState<string>("");

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedSearch = e.target.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    setSearchPlaylist(normalizedSearch);
  };

  // Filter playlist based on search
  const filteredPlaylists = playlists.filter((playlist) => {
    const normalizedName = playlist.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // to includes special caracters like ë,ö,œ....
      .toLowerCase();
    return normalizedName.includes(searchPlaylist);
  });

  return (
    <Stack>
      <BoxPanel>
        <Typography variant="h1" gutterBottom>
          My Spotify
        </Typography>

        {/* Search Input */}
        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          {!searchOpen ? (
            <IconButton onClick={handleSearchClick}>
              <SearchIcon sx={{ fontSize: 20, color: "#1DB954" }} />
            </IconButton>
          ) : (
            <TextField
              fullWidth
              variant="standard"
              placeholder="Rechercher dans la bibliothèque"
              autoFocus
              onBlur={() => setSearchOpen(false)}
              sx={{ borderRadius: 1 }}
              value={searchPlaylist}
              onChange={onSearch}
            />
          )}
        </Box>

        {/* Library */}
        <Box
          sx={{
            width: "auto",
            height: "calc(100vh - 130px)",
            overflowY: "auto",
            // hidden scrollbar
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <YourLibrary token={token} playlists={filteredPlaylists} />
        </Box>
      </BoxPanel>
    </Stack>
  );
};

export default Sidebar;
