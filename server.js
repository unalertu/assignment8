import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

// Serve public/ relative to this file so the server works from any directory
app.use(express.static(join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send("Hello from Unler's server");
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /api/\nAllow: /');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
