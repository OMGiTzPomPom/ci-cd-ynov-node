# Utilise l'image officielle Node.js
FROM node:22

# Crée le dossier de l'app
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY vue/package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY vue/ .
RUN chmod -R 755 .

# Expose le port utilisé par Vite (par défaut : 5173)
EXPOSE 5173

# Démarre le serveur de développement Vite
CMD ["npm", "run", "dev", "--", "--host"]
