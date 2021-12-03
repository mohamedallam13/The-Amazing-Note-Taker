const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    writeToFile,
    readAndAppend
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
// notesRouter.get('/', (req, res) => {
//     readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
// });


// GET Route for for all notes
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            res.json(json)
        });
});


// // GET Route for a specific note
// notesRouter.get('/:note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/db.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             const result = json.filter((note) => note.note_id === noteId);
//             return result.length > 0
//                 ? res.json(result)
//                 : res.json('Note not Found');
//         });
// });

// DELETE Route for a specific note
notesRouter.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/tips.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => note.notei_d !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/tips.json', result);

            // Respond to the DELETE request
            res.json(`Note ${tipId} has been deleted 🗑️`);
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
        readAndAppend(newNote, './db/deb.json');
        res.json(`note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notesRouter;
