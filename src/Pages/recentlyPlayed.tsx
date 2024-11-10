import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid2,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { SpotifyData, Track } from "../Types/RecentTracks"; // Importez le type SpotifyData

interface RecentlyPlayedProps {
  token: string;
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ token }) => {
  const [recentTracks, setRecentTracks] = useState<SpotifyData["items"]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Récupérer les titres récemment écoutés
  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des titres récemment écoutés."
          );
        }

        const data = await response.json();

        setRecentTracks(data.items);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecentlyPlayed();
  }, [token]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.default", padding: 2 }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Recently Played
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid2 container spacing={2}>
          {recentTracks.map((item, index) => (
            <Grid2 key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                  }}
                  image={item.track.album.images[0]?.url}
                  alt={item.track.name}
                />
                <CardContent>
                  <Typography variant="h6" color="text.primary">
                    {item.track.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Played at: {new Date(item.played_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default RecentlyPlayed;
