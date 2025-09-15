import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Compresión HTTP
app.use(compression());

// Seguridad: headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    `
      default-src 'self' 'unsafe-inline' data: blob:;
      script-src 'self' 'unsafe-inline' https://cdn.emailjs.com;
      connect-src 'self' https://api.emailjs.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
      font-src 'self';
    `.replace(/\s{2,}/g, ' ')
  );

  next();
});

// Servir archivos estáticos
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, { maxAge: '1y', etag: false }));

// Siempre devolver index.html para rutas SPA
app.use((req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(distPath, 'index.html'));
});


// Levantar server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Portfolio running on port ${PORT}`);
});
