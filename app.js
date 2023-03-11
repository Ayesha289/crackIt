const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/quizDB');

const userSchema = {
    email: String,
    password: String
};

const User = mongoose.model('User', userSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/quiz", function(req, res){
    res.render("quiz");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.get("/secret/register", function(req, res){
    res.render("register");
});

app.get("/secret/login", function(req, res){
    res.render("login");
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

app.post("/register", function(req, res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save();
        res.redirect("/secret/crackIt");
    });
});

app.post("/login", async function(req, res){
    const username = req.body.email;
    const userPass = req.body.password;
    const userFound = await User.find();
    userFound.forEach(element => {
        if(element.email === username){
            bcrypt.compare(userPass, element.password, function(err, result) {
                if(result === true){
                    res.redirect("/secret/crackIt");
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
