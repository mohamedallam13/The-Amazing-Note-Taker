const apiRouter = require('express').Router();

const path = require('path');

// Import our modular routers for /notes 
const notesRouter = require('./notes');

apiRouter.use('/notes', notesRouter);

apiRouter.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = apiRouter;
