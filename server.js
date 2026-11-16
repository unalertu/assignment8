import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/hello', (req, res) => {
  res.send("Hello from Unler's server");
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /api/\nAllow: /');
});

app.listen(PORT, () => {
  console.log(\Server running at http://localhost:\);
});
