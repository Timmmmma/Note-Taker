const fs = require("fs");
//set up data that get note variable from db.json.
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {
    //Setup the /api/notes get route
    app.get("/api/notes", function(req, res) {
       
        res.json(data);

    });
    //Retrieves a note with id
    app.get("/api/notes/:id", function(req, res) {

        res.json(data[req.params.id]);

    });

    //Setup the /api/notes get route
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        let noteId = (data.length).toString();
        //The new note get push, id is the last number
        newNote.id = noteId;
        data.push(newNote);
        console.log("A new note was taken") 
        fs.writeFileSync("./db/db.json", JSON.stringify(data));  
        res.json(data);    

    });

    //Setup the /api/notes get route
    app.delete("/api/notes/:id", function(req, res) {
        let deleteNote = req.params.id;
        console.log(`Deleting note with id ${deleteNote}`);
        //Delet the note that id number = req number
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === deleteNote) {
                data.splice([i], 1);
            }
        }
        //Reassign id number
        for (let i = 0; i < data.length; i++) {
            data[i].id = i.toString();
        }
        console.log(data);
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
        
    }); 

}