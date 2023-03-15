require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const nodeMailer = require("nodemailer");

const app = express();

app.use(express.static(__dirname + "/app"));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/quizDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String, 
    college: String,
    department: String,
    score: Number
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
        });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

// async function main(){

//     const transporter = nodeMailer.createTransport({
//         service: 'gmail',
//         auth: {
//             type: 'OAuth2',
//             user: process.env.MAIL_USERNAME,
//             pass: process.env.MAIL_PASSWORD,
//             clientId: process.env.OAUTH_CLIENTID,
//             clientSecret: process.env.OAUTH_CLIENT_SECRET,
//             refreshToken: process.env.OAUTH_REFRESH_TOKEN
//         }
//     });

//     const info = await transporter.sendMail({
//         from: "CodeFiesta <ayeshamulani495@gmail.com>",
//         to: "hulevaibhavi21@gmail.com",
//         subject: 'CodeFiesta - CrackIt',
//         text: 'Hi this mail is for testing'  
//     });
//     console.log("Message sent: " + info.messageId);
// }

// main()
// .catch(e => console.log(e));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/logout", function(req, res){
    req.logout(function(err) {
        if(err){ 
            console.log(err); 
        }else{
            res.redirect('/');
        }
    });
});

app.get("/quiz", function(req, res){
    if(req.isAuthenticated()){
        res.render("quiz");
    }else{
        res.redirect("/login");
    }
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

app.get("/secret/question-round-one", function(req, res){
    res.render("roundOne");
});

app.get("/secret/question-round-two", function(req, res){
    res.render("roundtwo");
});

app.post("/register", function(req, res){
    const newUser = new User({
        name: req.body.name,
        college: req.body.college,
        department: req.body.department
    });
    newUser.save();
    async function main(){

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });
    
        const info = await transporter.sendMail({
            from: "CodeFiesta <ayeshamulani495@gmail.com>",
            to: "ayeshamulani928@gmail.com",
            subject: 'CodeFiesta - CrackIt',
            text: 'Hi this mail is for testing'  
        });
        console.log("Message sent: " + info.messageId);
    }
    
    main()
    .catch(e => console.log(e));
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log();
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/quiz");
            });
        }
    });
});

app.post("/login", async function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/quiz");
            });
        }
    });
});

app.post("/secret", function(req, res){
    const accessCode = req.body.code;
    if(accessCode === process.env.CODE){
        res.render("crackIt");
    }else{
        res.send("Enter correct access code!")
    }
});

app.post("/questions", function(req, res){
    const numberOfQuestions = req.body.quesNum;
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});
