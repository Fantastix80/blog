#!/bin/bash

# Supprimer l'ancien build
rm -rf dist/

# Ajoute node a l'environnement
export PATH="/root/.nvm/versions/node/v22.18.0/bin:$PATH"

# Build Astro
npm run build

# Lance le serveur Express
node serve.js