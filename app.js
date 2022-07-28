// setting up server

const express = require("express");
const app = express();

const server = app.listen(8080, () => console.log("listening 8080"));

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// making db connect

const db = require("./db/connection.js");
db.once("open", () => {
  console.log("db connected");
});

const { Person } = require("./models/Person.js");

// // console.log(Person +"person schema")

// app.post("/postperson", (req, res) => {

//     let person = new Person(req.body);
//     // person.save();
//     person.save( error=>{
//         if(error){
//             res.send(500).json(error)
//         }else{
//             res.status(201).json({
//                 messege:"successfully",
//                 data: person
//             });
//         }
//     })
// });


app.get('/api/person', (req, res) => {
    Person.find().then(
        found => res.json(found)
    )
})


app.post('/api/person', (req, res) => {
    
    let name = req.body.name;
    let gender = req.body.gender;  
    let country = req.body.country;
    let email = req.body.email;
    let visitedPlaces = req.body.visitedPlaces;

    let person = new Person({
        name, gender, country, email, visitedPlaces
    });

    person.save( error=>{
        if(error){
            res.send(500).json(error)
        }else{
            res.status(201).json({
                messege:"successfully",
                data: person
            });
        }
    })
});
