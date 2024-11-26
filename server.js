// // server.js
// const express = require("express");
// const app = express();
// const port = 5002;

// app.get("/api", (req, res) => {
//   res.send("Hello from the backend!");
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// server.js
// server.js
const express = require("express");
const cors = require("cors"); // Importez le module CORS
const app = express();
const port = 5002;

// Ajoutez CORS comme middleware pour permettre les requêtes de toutes les origines
app.use(cors());

// Optionnellement, vous pouvez configurer CORS pour accepter uniquement certaines origines
// app.use(cors({
//   origin: 'http://localhost:3000'  // Remplacez par l'URL de votre frontend si vous voulez limiter
// }));

app.get("/api/masthead", (req, res) => {
  // Simulez des données Masthead ou récupérez-les depuis une autre source
  const mastheadData = {
    title: "Bienvenue sur Spotify",
    description: "Découvrez de la musique avec Spotify.",
    image: { url: "https://via.placeholder.com/500" }, // Remplacez par l'image réelle
  };
  res.json(mastheadData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
