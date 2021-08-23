const path = require('path')
const fs = require('fs')

module.exports = app => {
    fs.readFile("db/db.json","utf8", (err, data) => {
        if(err) throw err
        var notes = JSON.parse(data)

        app.get('/api/notes', (req, res) => {
            res.json(notes)
        })
        app.post('/api/notes', (req, res) => {
            let newNote = req.body
            notes.push(newNote)
            writeToDb()
            return console.log(`Sucessfully added ${newNote.title}`)
        })
        app.get('/api/notes/:id', (req, res) => {
            res.josn(notes[req.params.id])
        })
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'))
        })
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'))
        })
        function writeToDb() {
            fs.writeFile('db/db.json', JSON.stringify(notes), err =>{
                if(err) throw err
                return true
            })
        }
    })
}
/*
1. set up notes -done
2. set up the get route for notes -done
3. set up the post route for notes
 3.1. take new notes and put them into the database?
4.set up get for notes, need to look into ids. maybe uuid?
 4.1. display the notes from the json by id?
 4.2. inject notes into html.
 4.3 possibly need function to update the JSON whenever a note is added (or deleted if I can figure it out..)
5. looking into setting up a way to delete notes. look up express app documentation for delete method()


****Find out why page isnt reloading. May be front end issue***
*/