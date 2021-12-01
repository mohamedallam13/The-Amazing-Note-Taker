const defRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    writeToFile,
} = require('../helpers/fsUtils');

defRouter.get('*', (req, res) => {

});

// GET Route for retrieving all the tips
defRouter.get('/', (req, res) => {

});

// GET Route for a specific tip
defRouter.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;

});

// DELETE Route for a specific tip
defRouter.delete('/:note_id', (req, res) => {

});

// POST Route for a new UX/UI tip
defRouter.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

});

module.exports = defRouter;
