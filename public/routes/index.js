const express = require('express');

// Import our modular routers for /api and /def
const apiRouter = require('./api');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use('/api', apiRouter);

// GET Route for homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for homepage
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

module.exports = app;
