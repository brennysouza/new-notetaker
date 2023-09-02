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
    const data = JSON.parse(fs.readFileSync('/db/db.json'));
    res.json(data);
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
  
    const existingNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    existingNotes.push(newNote);
  
    fs.writeFileSync('./db/db.json', JSON.stringify(existingNotes));
    res.json(newNote);
  });

//   Add delete route here as bonus

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });