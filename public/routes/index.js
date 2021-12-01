const express = require('express');

// Import our modular routers for /api and /def
const apiRouter = require('./api');
const defRouter = require('./def');

const app = express();

app.use('/api', apiRouter);
app.use('/', defRouter);
// TODO: Initialize diagnostics route

module.exports = app;
