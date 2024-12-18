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
import { SpotifyData } from "../Types/RecentTracks"; // Importez le type SpotifyData
import { fetchRecentlyPlayed } from "../Functions/Fetchs";
import { fetchTopItems } from "../Functions/FetchUserPlaylist";
import BoxPanel from "./BoxPanel";
// import axios from "axios";

interface RecentlyPlayedProps {
  token: string;
}
interface topItems {
  title: string;
  description: string;
  image: string;
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ token }) => {
  const [recentTracks, setRecentTracks] = useState<SpotifyData["items"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Nouvel état pour les erreurs
  const [topItems, setTopItems] = useState<topItems | null>(null);

  // Music recently played
  useEffect(() => {
    if (token) {
      fetchRecentlyPlayed(token)
        .then((data) => {
          setRecentTracks(data.items);
          setLoading(false);
        })
        .catch((err) => {
          setError("Impossible de récupérer les morceaux récemment écoutés.");
          setLoading(false);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token)
      fetchTopItems(token, "tracks")
        .then((data) => {
          setTopItems(data);
          console.log(data.items);
        })
        .catch((err) => {
          setError("Impossible de récupérer les top items.");
          console.error(err);
        });
  }, []);

  return (
    <BoxPanel>
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
          width="auto"
          sx={{
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
                  width: "auto",
                  p: 1,
                  backgroundColor: "rgb(72, 109, 86,0.9)",
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
    </BoxPanel>
  );
};

export default RecentlyPlayed;
