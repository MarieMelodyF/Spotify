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

  // Music recently played
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
        <Grid2
          container
          spacing={2}
          height={300}
          width={750}
          sx={{
            border: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {recentTracks.map((item, index) => (
            <Grid2 key={index} p={2} size={{ xs: 12, sm: 4 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 110,
                  width: 200,
                  p: 1,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                  }}
                  image={item.track.album.images[0]?.url}
                  alt={item.track.name}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ width: "auto" }}
                  >
                    {item.track.name}
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
