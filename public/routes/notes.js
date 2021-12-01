const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
// notesRouter.get('/', (req, res) => {
//     readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
// });

// GET Route for a specific note
notesRouter.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('Note not Found');
        });
});

// DELETE Route for a specific note
notesRouter.delete('/:note_id', (req, res) => {
    const NoteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            var deleteChek = deleteNote(json, noteId);
            if (deleteCheck) {
                res.json(`Item ${noteId} has been deleted 🗑️`);
                
            }else{
                res.json(`Item ${noteId} failed to delete`);

            }

            function deleteNote(json, noteId) {
                const toDelete = [];
                json.forEach((note, i) => {
                    if (note.note_id !== noteId) {
                        toDelete.push(i);
                    }
                });
                if (toDelete.length == 0) return;
                toDelete.forEach(index=>json.splice(index, 1));
                // Save that array to the filesystem
                writeToFile('./db/db.json', json);
                return true;
            }

            // Respond to the DELETE request
        });
});

// POST Route for a new note
notesRouter.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        readFromFile('./db/db.json')
            .then((data) => JSON.parse(data))
            .then((json) => {
                json.push(newNote)
                writeToFile(JSON.stringify(notes), './db/db.json');
                res.json(`note added successfully 🚀`);
            });
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notesRouter;
