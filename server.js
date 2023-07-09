// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = process.env.PORT || 3001;

const indexPath = path.join(__dirname, 'Develop', 'public', 'index.html');
const notesPath = path.join(__dirname, 'Develop', 'public', 'notes.html');

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);