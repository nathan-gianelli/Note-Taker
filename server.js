const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
 
var saveNote = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json',"utf-8", (err, data) => {
        if(err) {
            throw err
        } 
         res.json(JSON.parse(data))
            //console.log(data)
        
    });
  });

  
app.post("/api/notes", (req,res) => {
    let newNote = req.body;
    let id = saveNote.length.toString();
    newNote.id = id
    saveNote.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(saveNote));
    res.json(saveNote);
})

app.delete("/api/notes/", (req,res) => {
    let note = req.body.id
    saveNote =saveNote.filter(Element => {
        return Element.id != note
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(saveNote));
    res.json(saveNote);
})

app.listen(PORT, function() {
  console.log('PORT 8080 is running')
});