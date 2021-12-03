const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    writeToFile,
    readAndAppend
} = require('../helpers/fsUtils.js');

// GET Route for for all notes
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            res.json(json)
        });
});

// DELETE Route for a specific note
notesRouter.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Note ${noteId} has been deleted 🗑️`);
        });
});

// POST Route for a new note
notesRouter.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notesRouter;
