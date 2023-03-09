const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/quiz", function(req, res){
    res.render("quiz");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
