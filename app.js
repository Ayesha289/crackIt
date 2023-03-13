require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/quizDB');

app.get("/", function(req, res){
    res.render("home");
});

app.get("/quiz", function(req, res){
    res.render("quiz");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.get("/secret/crackIt", function(req, res){
    res.render("crackIt");
});

app.get("/secret/questions", function(req, res){
    res.render("questions");
});

app.get("/secret/responses", function(req, res){
    res.render("responses");
});

app.get("/secret/mails", function(req, res){
    res.render("mails");
});

app.post("/secret", function(req, res){
    const accessCode = req.body.code;
    if(accessCode === process.env.SECRET){
        res.render("crackIt");
    }else{
        res.send("Enter correct access code!")
    }
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});
