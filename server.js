const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

const indexPath = path.join(__dirname, 'Develop', 'public', 'index.html');
const notesPath = path.join(__dirname, 'Develop', 'public', 'notes.html');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

app.get('/notes', (req, res) => res.sendFile(notesPath));

app.get('/api/notes', (req, res) => {
  fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
  note.id = uuidv4();

  fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      notes.push(note);

      fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.json(note);
        }
      });
    }
  });
});

app.get('*', (req, res) => res.sendFile(indexPath));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);