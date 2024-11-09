import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid2,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface ContentProps {
  token: string | null;
  playlists: any[];
}

const Content: React.FC<ContentProps> = ({ token, playlists }) => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.default", padding: 3 }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Your Playlists
      </Typography>
      <Grid2 container spacing={2}>
        {playlists.map((playlist, index) => (
          <Grid2 key={index} component={"body"}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                backgroundColor: "background.paper", // Applique la couleur de fond personnalisée
                borderRadius: 2, // Coins arrondis pour les cartes
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Ombrage léger
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Changement de couleur au survol
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Ombrage au survol
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  maxWidth: 120,
                  height: 80,
                  objectFit: "cover",
                  transition: "opacity 0.3s ease",
                  borderRadius: 1, // Coins arrondis pour l'image
                  "&:hover": {
                    opacity: 0.2, // Effet de transparence sur l'image au survol
                  },
                }}
                image={playlist.images[0]?.url}
                alt={playlist.name}
              />
              <CardContent sx={{ flexGrow: 1, paddingLeft: 2, width: 260 }}>
                <Typography variant="subtitle1" color="text.primary">
                  {playlist.name}
                </Typography>
              </CardContent>
              {/* Logo Play au centre */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1, // Affiche le logo play au survol
                  },
                }}
              >
                <PlayCircleIcon
                  sx={{ fontSize: 50, color: "rgba(255, 255, 255, 0.7)" }}
                />
              </Box>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Content;
