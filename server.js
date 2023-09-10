// Modules and libraries
const express = require('express');
const fs = require('fs');
const path = require("path");
// const uuid = require('uuid');
// Imports api routes
const apiRoutes = require('./routes/notesapi');
// const routeNote = require('./routes/routenotes');
// Defines the port
const PORT = process.env.PORT || 3001;
// Creates express application
const app = express();

// Middleware
// Parse Json request bodies
app.use(express.json());
// Parse URL encoded request bodies
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Function to read notes in the db file
function readDbNotes() {
  const DbNotes = fs.readFileSync('db/db.json', 'utf-8')
  return JSON.parse(DbNotes)
};

// Function to save notes in database file
function saveNoteDb(data) {
  fs.writeFile('db/db.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('error', err);
    } else {
      console.log('Note has been generated!');
    }
  });
};

// Function to add new notes in database file
function addDbNote(newNote) {
  const existDbNote = readDbNotes()
  existDbNote.push(newNote)
  saveNoteDb(existDbNote);
};

// Function to delete note from database file
function noteRemovalDb(uuid) {
  const existDbNote = readDbNotes()
  const filterThruNotes = existDbNote.filter(newNote => {
      return newNote.id !== uuid
  })
  saveNoteDb(filterThruNotes)
};

// Code uses the API routes defined in notesapi.js
app.use('/api', apiRoutes);

// Code that creates route for notes.html file.  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

// Code below defines a catch-all route to serve the 'index.html' page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// This starts the server and listen on port defined above 3001
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  // Code allows functions to be used in other modules
  module.exports = {
    readDbNotes,
    saveNoteDb,
    addDbNote,
    noteRemovalDb,
  };
  