const express = require('express');

// Require Path and the main router for API

const path = require('path');
const apiRouter = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and fetching from public folder as well as direct to routes
app.use(express.json());
app.use(express.static("public"));
app.use('/api', apiRouter);

// GET Route for homepage
app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET send all other queries to index
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

module.exports = app;
