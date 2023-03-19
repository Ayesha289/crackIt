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
const roundOneCode = Math.floor(100000 + Math.random() * 900000);
const roundTwoCode = Math.floor(100000 + Math.random() * 900000);
const selectedMails = [];
const quizAnswer = [];

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/app"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.5nfxrlm.mongodb.net/crackitDB");
}

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    score: Number,
    answer: [String]
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

app.get("/access", function(req, res){
    res.render("access");
});

app.get("/roundOne", function(req, res){
    if(req.isAuthenticated()){
        res.render("roundOne");
    }else{
        res.redirect("/login");
    }
});

app.get("/roundTwo", function(req, res){
    if(req.isAuthenticated()){
        res.render("roundTwo");
    }else{
        res.redirect("/login");
    }
});

app.get("/thanks", function(req, res){
    res.render("thanks");
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

app.get("/secret/sendMail", function(req, res){
    res.render("sendMail");
});

app.post("/register", function(req, res){
    const email = req.body.username;
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
            to: email,
            subject: 'CodeFiesta - CrackIt',
            text: "The access code for CodeFiesta - CrackIt Round One is: " + roundOneCode  
        });
        console.log("Message sent: " + info.messageId);
    }

    main()
    .catch(e => console.log(e));
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/access");
            });
        }
    });
});

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    const email = req.body.username;
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
            to: email,
            subject: 'CodeFiesta - CrackIt',
            text: "The access code for CodeFiesta - CrackIt Round Two is: " + roundTwoCode  
        });
        console.log("Message sent: " + info.messageId);
    }

    main()
    .catch(e => console.log(e));
    req.login(user, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/access");
            });
        }
    });
});

app.post("/access", function(req, res){
    const code = req.body.code;
    if(code == roundOneCode){
        res.redirect("/roundOne");
    }else if(code == roundTwoCode){
        res.redirect("/roundTwo");
    }else{
        res.send("Enter correct access code");
        res.redirect("/access");
    }
});

app.post("/roundTwo", function(req, res){
    const answer = req.body.answer;
    quizAnswer.push(answer);
});

app.post("/thanks", function (req, res){
    res.redirect("/thanks");
    
});

app.post("/secret", function(req, res){
    const accessCode = req.body.code;
    if(accessCode === process.env.CODE){
        res.render("crackIt");
    }else{
        res.send("Enter correct access code!")
    }
});

app.post("/secret/mails", function(req, res){
    const mail = req.body.mail;
    selectedMails.push(mail);
    res.redirect("/secret/mails");
});

app.post("/secret/sendMail", function(req, res){
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
            to: selectedMails,
            subject: 'CodeFiesta - CrackIt',
            text: "Congratulations!! You have been selected to ROUND TWO of CodeFiesta - CrackIT!!" 
        });
        console.log("Message sent: " + info.messageId);
    }

    main()
    .catch(e => console.log(e));
    res.redirect("/secret/sendMail");
    selectedMails = [];
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});