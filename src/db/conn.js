// const express = require("express");
// const path = require("path");
// const app = express();
// const port = process.env.PORT || 8000;
const mongoose = require("mongoose")

//connecting with mongodb named todo
mongoose.connect('mongodb+srv://nitish:nitish@cluster0.9uw8i.mongodb.net/registration?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, 'useFindAndModify': false, 'useCreateIndex': true })
    .then(() => console.log("connection succesfull"))
    .catch(() => console.log("error in connecting database"));

