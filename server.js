const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

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
        } else {
            res.json(data)
            console.log(data)
        }

    });
  });
app.listen(PORT, function() {
  console.log('PORT 8080 is running')
});