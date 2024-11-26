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
// import axios from "axios";

interface RecentlyPlayedProps {
  token: string;
}
interface MastheadData {
  title: string;
  description: string;
  image: string;
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ token }) => {
  const [recentTracks, setRecentTracks] = useState<SpotifyData["items"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Nouvel état pour les erreurs
  const [mastheadData, setMastheadData] = useState<MastheadData | null>(null);
  console.log(mastheadData);

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

  // useEffect(() => {
  //   fetchMastheadData()
  //     .then((data) => {
  //       setMastheadData({
  //         title: data?.masthead?.title || "Titre non disponible",
  //         description:
  //           data?.masthead?.description || "Description non disponible",
  //         image: data?.masthead?.image?.url || "",
  //       });
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError("Impossible de récupérer les données Masthead.");
  //       setLoading(false);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5002/api/masthead")
  //     .then((response) => {
  //       console.log("===>", response);
  //       setMastheadData({
  //         title: response.data.title || "Titre non disponible",
  //         description:
  //           response.data.description || "Description non disponible",
  //         image: response.data.image?.url || "",
  //       });
  //       setLoading(false);
  //     })

  //     .catch((err) => {
  //       setError("Erreur de récupération des données Masthead");
  //       setLoading(false);
  //     });
  // }, []);

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
      {/* {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : mastheadData ? (
        <Card sx={{ maxWidth: 500, margin: "auto" }}>
          <img
            src={mastheadData.image}
            alt={mastheadData.title}
            style={{ width: "100%", objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h5" color="text.primary" gutterBottom>
              {mastheadData.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {mastheadData.description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>Aucune donnée disponible.</Typography>
      )} */}
    </Box>
  );
};

export default RecentlyPlayed;
