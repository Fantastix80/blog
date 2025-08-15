import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const distDir = path.join(__dirname, 'dist');

// Langues supportées
const supportedLocales = ['fr', 'en'];
const defaultLocale = 'fr';

// Redirection automatique basée sur Accept-Language
app.get('/', (req, res) => {
  const acceptLanguage = req.headers['accept-language'];
  let locale = defaultLocale;

  if (acceptLanguage) {
    const preferred = acceptLanguage.split(',')[0].trim().slice(0, 2).toLowerCase();
    if (supportedLocales.includes(preferred)) {
      locale = preferred;
    }
  }

  res.redirect(302, `/${locale}/`);
});

// Sert les fichiers statiques
app.use(express.static(distDir));

// Fallback 404
app.use((_, res) => {
  res.status(404).sendFile(path.join(distDir, '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Blog en ligne sur http://localhost:${PORT}`);
});
