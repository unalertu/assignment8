import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

const courses = [
  { id: 1, title: 'Web Programming', credits: 6 },
  { id: 2, title: 'Algorithms and Data Structures', credits: 5 },
  { id: 3, title: 'Database Systems', credits: 4 },
];

let requestCount = 0;

// Logs timestamp, method and URL for every request
app.use((req, res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.url}`);
  next();
});

// Counts every request (including static files and 404s)
app.use((req, res, next) => {
  requestCount++;
  next();
});

app.use(express.static(join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send("Hello from Unler's server");
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /api/\nAllow: /');
});

app.get('/old-page', (req, res) => {
  res.redirect('/hello');
});

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

app.get('/api/headers', (req, res) => {
  res.json({
    'User-Agent': req.get('user-agent') ?? null,
    Accept: req.get('accept') ?? null,
  });
});

app.post('/api/subscribe', (req, res) => {
  res.status(201).json({ subscribed: true });
});

app.get('/api/admin', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.get('/api/stats', (req, res) => {
  res.json({ requestsServed: requestCount });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
