const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PersonSchema = new Schema(
    {
        name:{
            type: String,
            minlength: 1,
            maxlength: 30,
        },
        gender:{
            type: [{type:String}],
            enum: ['Male', 'Female']
        },
        country:{
            type: [{type:String}],
            enum: ['US', 'Canada', 'India']
        },
        email:{
            type: String,
            minlength: 1,
            maxlength: 30,
        },
        visitedPlaces:{
            type: [{type:String}],
            enum: ['Lynn', 'Stanley', 'English Bay']
        }
    }
)

exports.Person = mongoose.model('Person', PersonSchema)