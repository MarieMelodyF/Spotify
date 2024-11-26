import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid2,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

interface ContentProps {
  token: string | null;
  playlists: any[];
}

const YourLibrary: React.FC<ContentProps> = ({ playlists }) => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.default", padding: 1 }}>
      <Typography variant="h2" color="text.primary" gutterBottom>
        Your Playlists
      </Typography>
      <Grid2 container spacing={2} direction="column">
        {playlists.map((playlist, index) => (
          <Grid2 container key={index} p={1}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                borderRadius: 2,
                height: 95,
                width: "100%",
                p: 1,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  padding: 1,
                }}
              >
                {/* Img playlist */}
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      opacity: 0.3,
                    },
                    border: 1,
                  }}
                  image={playlist.images[0]?.url || "default-image-url"}
                  alt={playlist.name}
                />
                {/* Icône Play */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <PlayArrow
                    sx={{ fontSize: 40, color: "rgba(255, 255, 255, 0.9)" }}
                  />
                </Box>
              </Box>

              {/* playlist Infos */}
              <CardContent sx={{ paddingLeft: 2, width: "calc(100% - 80px)" }}>
                <Typography variant="subtitle1" color="text.primary">
                  {playlist.name.length > 50
                    ? playlist.name.substring(0, 50) + "..."
                    : playlist.name}
                </Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {playlist.type} {"."} {playlist.owner.display_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default YourLibrary;
