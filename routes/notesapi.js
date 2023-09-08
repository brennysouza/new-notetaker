const router = require('express').Router();
const fs = require('fs');


router.get('/notes', function (req, res) {
    console.log("Hello");
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        console.log(data);
        var dataJson = JSON.parse(data);
        console.log(err);
        return res.json(dataJson);
    });
});

router.post('/notes', (req, res) => {
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
router.delete("/notes/:id", (req, res) => {
    noteRemovalDb(req.params.id)
    res.status(200).send()
  });

module.exports = router;