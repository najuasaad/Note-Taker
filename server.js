const express = require('express');
const fs = require('fs');
const path = require('path');
const randomId = require('random-id')

const len = 4
const pattern = 'aA0'
let iden = randomId(len, pattern)

const app = express();
const PORT = process.env.PORT || 8080;

const random = Math.floor(Math.random() * 1000);

//const allNotes = require('./db/db.json')
//let allNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/css/styles.css'))
})

app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/js/index.js'))
})

app.get('/api/notes', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(data);
});

app.post('/api/notes', (req, res) => {
    var allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) 
    var newNote = req.body;
    newNote.id = iden
    console.log(newNote.id)
    allNotes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    console.log('note saved')
    res.json(allNotes);
});

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id
    const yallNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    //res.send(userId)
    const obj = yallNotes.filter( note => note.id !== id )
    fs.writeFileSync('./db/db.json', JSON.stringify(obj))
    res.json(obj)
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));