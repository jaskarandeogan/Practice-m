// To initiate Node project

// 1. npm init -y

// 2. npm install

//to install express, axios, mongoose, reactDom

// 3. npm install express axios react-dom  mongoose

// to install nodemon

// 4. npm install nodemon --savedev

// add  "dev": "nodemon app.js"

// 5. install webpack

// npm install webpack webpack-cli style-loader css-loader babel-loader @babel/core @babel/preset-env @babel/preset-react

// add "watch": "webpack --watch" to package.json

// npm run watch

// then add "dev": "nodemon app.js" in script section of package.json file

// setup server code

const express = require("express");
const app = express();

const server = app.listen(8080, () => console.log("listening"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// server has be setup

//make db connection make folder name db same level as public and src; and then make a file inside called connection.db

const mongoose = require("mongoose");

let mongoDB = `mongodb+srv://jaskaran2k15:N1yOjoDZROoFyCzp@cluster0.a2ac0lf.mongodb.net/<data base name>?retryWrites=true&w=majority`;

// my connection string is as follows in mongoDB var

//username: jaskaran2k15 password: N1yOjoDZROoFyCzp

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;

//create db schema object

// this file has been created inside public/models folder

//the file name should be Capitalized

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Sample schema

const PersonSchema = new Schema({
  Name: {},
  gender: {},
  country: {},
  email: {},
  visitedPlaces: {},
});

exports.Person = mongoose.model("Person", PersonSchema);

// sample string for schema

// type: String,
// minlength: 1,
// maxlength: 20,
// required: true

// gender:{
//         type: [{type:String}],
//         enum: ['Male', 'Female']
//     },

// All code for schema ends here

// coming to app.js file

//make import schema

const { Person } = require("./models/Person.js");

//posting data to backend using req.body method
app.post("/postperson", (req, res) => {
  let person = new Person(req.body);
  // person.save();
  person.save((error) => {
    if (error) {
      res.send(500).json(error);
    } else {
      res.status(201).json({
        messege: "successfully",
        data: person,
      });
    }
  });
});

//  react method of posting values to the database

// state handling for postperson

const [input, setInput] = useState({
  name: " ",
  gender: " ",
  country: "India",
  email: " ",
  visitedPlaces: [],
});
// handle change for all the input fields
const handleChange = (event) => {
  // console.log(event.target);
  const { name, value } = event.target;
  setInput((prevInput) => {
    return {
      ...prevInput,
      [name]: value,
    };
  });
};
// posting data to backend
const handleSubmit = (event) => {
  // event.preventDefault();
  console.log(input);

  const newPerson = {
    name: input.name,
    gender: input.gender,
    country: input.country,
    email: input.email,
    visitedPlaces: input.visitedPlaces,
  };
  axios
    .post("http://localhost:8080/api/person", newPerson)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};

// setting up express endpoints in app.js file

app.post("/api/person", (req, res) => {
  // this is to get all the values from req.body one by one which were passed
  let name = req.body.name;
  let gender = req.body.gender;
  let country = req.body.country;
  let email = req.body.email;
  let visitedPlaces = req.body.visitedPlaces;

  let person = new Person({
    name,
    gender,
    country,
    email,
    visitedPlaces,
  });

  person.save((error) => {
    if (error) {
      res.send(500).json(error);
    } else {
      res.status(201).json({
        messege: "successfully",
        data: person,
      });
    }
  });
});

// post is done here

// how to get data from the db

// React side state handle, fetching data from the db using axios and  passing  it to useEffect method

const [Data, setData] = useState();

const getAllData = () => {
  axios
    .get("http://localhost:8080/api/person")
    //   this can be used as it is by changing api endpoints
    .then((response) => {
      console.log(response);
      setData(response.data);
    })
    .catch((error) => console.log(error));
};

useEffect(getAllData, []);

// show data in html like this with map
<ul>
  {Data?.map((data) => {
    return <li key={data._id}>{data.name}</li>;
  })}
</ul>;


//

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const PostToDoItem = props => {

    const [ todoItem, setToDoItem ] = useState()
    const [ checkedItems, setCheckedItems] = useState([])

    const typesArray = ["study", "chore", "work", "other"]
 
    const handleNameChange = event => {
        setToDoItem(event.target.value)
    }

    const handleTypesChange = (event) => {
            let type = event.target.value
            setCheckedItems(
                [...checkedItems, type]
            )
            console.log('checkedItems:', checkedItems)
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        let data = JSON.stringify({  
            item: todoItem,
            type: checkedItems
        });
  
        axios.post('/todolist', data, {
            headers:{"Content-Type" : "application/json"}
        })
        .then(results =>{
            let id = Math.floor(Math.random() * 1000)
            console.log(results)
            props.setId(id)
            setToDoItem('')
            setCheckedItems('')
        })
        .catch(error=> {
            console.log(error)
        })
    }


    return (
        <>
            <h1>My To Do Items</h1>
            <form onSubmit={event=>handleFormSubmit(event)}>
                <label>
                    New to do: 
                    <input type="text" name="item" onBlur={event=>handleNameChange(event)} />
                </label>
                <fieldset>
                    <legend>Choose types</legend>
                    {typesArray.map(
                        (value, index)=>
                        <label key={index}>{value}
                            <input 
                            type="checkbox" 
                            value={value}  
                            // checked={checked}
                            onChange={event=>handleTypesChange(event)} />
                        </label>)}
                </fieldset>

                <button>Add</button>
                <input type="reset"></input>
            </form>

        </>
    )
}


export default PostToDoItem