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
import { TopTracks } from "../Types/TopItems";
import { fetchTopItems } from "../Functions/FetchUserPlaylist";
import BoxPanel from "./BoxPanel";

interface TopItemsProps {
  token: string;
}

const TopItems: React.FC<TopItemsProps> = ({ token }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Nouvel état pour les erreurs
  const [topItems, setTopItems] = useState<TopTracks["items"]>([]);
  console.log("topItems", topItems);

  useEffect(() => {
    if (token)
      fetchTopItems(token, "tracks")
        .then((data) => {
          setTopItems(data.items);
          setLoading(false);
        })
        .catch((err) => {
          setError("Impossible de récupérer les top items.");
          console.error(err);
        });
  }, []);

  return (
    <BoxPanel maxwdith={400} borderRadius={2}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Top items
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
          {topItems.map((item, index) => (
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
                  image={item.album.images[0]?.url}
                  alt={item.name}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ width: "auto" }}
                    width={160}
                  >
                    {item.album.name}
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

export default TopItems;
