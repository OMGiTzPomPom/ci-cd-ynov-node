const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { getAllUsers, deleteUser, login, addUser } = require('./src/controller/userController');
const { createPost, getAllPosts, getPostById, updatePost, deletePost} = require('./src/controller/postController');
const auth = require('./src/middleware/auth');
const adminOnly = require('./src/middleware/adminOnly');

dotenv.config();

const app = express();
const databaseUrl = process.env.DATABASE_URL;
const port = 4000;

app.use(cors());
app.use(express.json());

if (mongoose.connection.readyState === 0) {
  const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(databaseUrl, mongoConfig)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
    });
}

// Route POST pour ajouter un user (publique)
app.post('/v1/users', addUser);
// Route GET pour récupérer tous les users (admin seulement)
app.get('/v1/users', auth, adminOnly, getAllUsers);
// Route DELETE pour supprimer un user (admin seulement)
app.delete('/v1/users/:id', auth, adminOnly, deleteUser);
// Route POST pour login
app.post('/v1/login', login);



// Route POST pour créer un post (utilisateur connecté)
app.post('/v1/posts', auth, createPost);
// Route GET pour lister tous les posts (publique ou protégée selon ton besoin)
app.get('/v1/posts', getAllPosts);
// Route GET pour un post précis
app.get('/v1/posts/:id', getPostById);
// Route PUT pour mettre à jour un post (admin seulement ou auteur uniquement)
app.put('/v1/posts/:id', auth, adminOnly, updatePost);
// Route DELETE pour supprimer un post (admin seulement ou auteur)
app.delete('/v1/posts/:id', auth, adminOnly, deletePost);

// Démarrage du serveur (uniquement en local/Docker, pas sur Vercel/Serverless)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
}

module.exports = app; // Exporter l'application pour les tests toto