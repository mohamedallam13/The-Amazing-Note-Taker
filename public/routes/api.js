const apiRouter = require('express').Router();

// Import our modular routers for /notes 
const notesRouter = require('./notes');

apiRouter.use('/notes', notesRouter);

module.exports = apiRouter;
