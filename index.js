const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', (req, res) => {
  res.cookie('login', req.body.username);
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  res.clearCookie('login');
  res.redirect('/');
});

app.listen(port);