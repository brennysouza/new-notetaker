const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');
const routeNote = require('./routenotes');

// Function to read data from the database JSON file
function readDbNotes() {
  const DbNotes = fs.readFileSync('db/db.json', 'utf-8');
  return JSON.parse(DbNotes);
}

// Function to save data to the database JSON file
function saveNoteDb(data) {
  fs.writeFileSync('db/db.json', JSON.stringify(data, null, 2));
}

// Function to add a new note to the database
function addDbNote(newNote) {
  const existDbNote = readDbNotes();
  existDbNote.push(newNote);
  saveNoteDb(existDbNote);
}

// Function to remove a note from the database by ID
function noteRemovalDb(uuid) {
  const existDbNote = readDbNotes();
  const filterThruNotes = existDbNote.filter((newNote) => {
    return newNote.id !== uuid;
  });
  saveNoteDb(filterThruNotes);
}

router.get('/notes', function (req, res) {
  const dataJson = readDbNotes();
  res.json(dataJson);
});

router.post('/notes', (req, res) => {
  if (req.body && req.body.title && req.body.text) {
    const newNote = new routeNote(req.body.title, req.body.text, uuid.v4());
    addDbNote(newNote);
    res.status(201).json(newNote);
  } else {
    res.status(400).json('Title and text required!');
  }
});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  noteRemovalDb(noteId);
  res.status(200).send();
});

module.exports = router;
