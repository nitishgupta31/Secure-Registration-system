require("dotenv").config();
const express = require('express');
const app = express();
require('./db/conn');
const Register = require('./models/models');
const path = require("path");
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files 
app.use(express.urlencoded({ extended: true })) //To extract the data from the website to the app.js file

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, '../views')) // Set the views directory

app.get("/", (req, res) => {
    res.render("index.pug")
});

app.get("/login", (req, res) => {
    res.render("login.pug")
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email })
        const isMatch = await bcrypt.compare(password, useremail.password)

        const token = await useremail.generateAuthToken();

        if (isMatch) {
            res.status(201).redirect("/")
        }
        else {
            res.status(400).send("invalid credentials")
        }
    } catch (error) {
        res.status(400).send("invalid credentials")
    }
});

app.post('/register', async (req, res) => {
    try {
        if (req.body.password === req.body.confirmPassword) {
            var myData = new Register(req.body);

            console.log(myData)

            const token = await myData.generateAuthToken();

            await myData.save()
            res.status(201).render("login");
        }
        else {
            res.send("Passwords Donot Match");
        }
    } catch (error) {
        res.status(400).send("unable to save to database");
    }
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});