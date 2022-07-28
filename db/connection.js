const mongoose = require('mongoose')

let mongoDB = `mongodb+srv://jaskaran2k15:N1yOjoDZROoFyCzp@cluster0.a2ac0lf.mongodb.net/person?retryWrites=true&w=majority`

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;