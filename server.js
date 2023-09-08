const express = require('express');
const fs = require('fs');
const path = require("path");
const uuid = require('uuid');
const apiRoutes = require('./routes/notesapi');
const routeNote = require('./routes/routenotes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

  function readDbNotes() {
    const DbNotes = fs.readFileSync('db/db.json', 'utf-8')
    return JSON.parse(DbNotes)
  };

  function saveNoteDb(data) {
    fs.writeFile('db/db.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('error', err);
      } else {
        console.log('Note has been generated!');
      }
    });
  };

  function addDbNote(newNote) {
    const existDbNote = readDbNotes()
    existDbNote.push(newNote)
    saveNoteDb(existDbNote);
  };

  function noteRemovalDb(uuid) {
    const existDbNote = readDbNotes()
    const filterThruNotes = existDbNote.filter(newNote => {
        return newNote.id !== uuid
    })
    saveNoteDb(filterThruNotes)
  };

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });