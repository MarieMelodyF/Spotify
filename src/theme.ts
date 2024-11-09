// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1DB954", // Vert typique de Spotify
    },
    secondary: {
      main: "#191414", // Couleur secondaire sombre
    },
    background: {
      default: "#121212", // Fond sombre
      paper: "#181818", // Fond des éléments (comme les cartes)
    },
    text: {
      primary: "#FFFFFF", // Texte principal en blanc
      secondary: "#B3B3B3", // Texte secondaire
    },
    action: {
      hover: "rgba(255, 255, 255, 0.1)", // Effet de survol en transparence
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Police de l'application
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "background-color 0.3s ease", // Ajoute la transition de couleur
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Coins arrondis sur l'image
        },
      },
    },
  },
  //   MuiBox: {
  //     styleOverrides: {
  //       root: {
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       },
  //     },
  //   },
});

export default theme;
