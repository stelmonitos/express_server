const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile('./views/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html');
});

app.get('/contact', (req, res) => {
  res.sendFile('./views/contact.html');
});

app.get('/info', (req, res) => {
  res.sendFile('./views/info.html');
});

app.get('/history', (req, res) => {
  res.sendFile('./views/history.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});