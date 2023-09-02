const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
  app.get('/api/notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.json(data);
  });