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
      default: "#121212", // Fond sombre global
      paper: "#181818", // Fond pour les éléments comme les cartes
    },
    text: {
      primary: "#FFFFFF", // Texte principal en blanc
      secondary: "#000000", // Texte secondaire
    },
    action: {
      hover: "rgba(255, 255, 255, 0.1)", // Effet de survol pour les cartes
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    subtitle1: {
      fontWeight: 500,
      fontSize: 13,
    },
    subtitle2: {
      fontWeight: 350,
      fontSize: 12,
    },
    h1: {
      fontWeight: 600,
      fontSize: 17,
    },
    h2: {
      fontWeight: 500,
      fontSize: 15,
    },
    h3: {
      fontWeight: 400,
      fontSize: 14,
    },
    h4: {
      fontWeight: 300,

      fontSize: 13,
    },
    h5: {
      fontWeight: 300,
      fontSize: 12,
    },
    h6: {
      fontWeight: 200,
      fontSize: 12,
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#181818", // Fond des cartes
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",

            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
