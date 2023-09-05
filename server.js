const express = require('express');
const fs = require('fs');
const path = require("path");
const uuid = require('uuid');
const routeNote = require('./routes/routenotes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
  
app.get('/api/notes', function (req, res) {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
      var dataJson = JSON.parse(data);
      // console.log(err);
      // console.log(data);
      res.json(dataJson);
    });
    // const data = JSON.parse(fs.readFileSync('/db/db.json'));
    // res.json(data);
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

  app.post('/api/notes', (req, res) => {
    if (req.body && req.body.title && req.body.text) {
      const newNote = new routeNote(req.body.title, req.body.text, uuid.v4())
      addDbNote(newNote)
      res.status(201).json(newNote);
    } else {
      res.status(400).json('Title and text required!');
    }
    // newNote.id = uuid.v4();
    // const existingNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    // existingNotes.push(newNote);
  
    // fs.writeFileSync('./db/db.json', JSON.stringify(existingNotes));
    // res.json(newNote);
  });

//   Add delete route here as bonus
app.delete("/api/notes/:id", (req, res) => {
  noteRemovalDb(req.params.id)
  res.status(200).send()
});

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });