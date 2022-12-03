require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// Importing skills --- 
const skills = require("./public/js/skills.js");
// Importing projects --- 
const projects = require("./public/js/projects.js");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const ejs = require("ejs");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(session({
    secret: "This is my best portfolio website ever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-meghsham:Megh$h%40m50@cluster0.gpzckyr.mongodb.net/portFolioDb");// Created a Schema --- 
const commentSchema = new mongoose.Schema({
    name:String,
    comment:String
});
const Comment = new mongoose.model("Comment", commentSchema);

const userSchema = new mongoose.Schema({
    email: String,
    comment: [commentSchema],
    password: String,
    username: String,
    googleId: String,
    githubId: String,
    facebookId: String
});
userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "https://meghsham-jade.azurewebsites.net/auth/google/portFolio"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        user.username = profile.name.givenName;
        user.save();
      return cb(err, user);
    });
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "https://meghsham-jade.azurewebsites.net/auth/github/portFolioAzure"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
        user.username = profile.username;
        user.save();
        return done(err, user);
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
    if(req.isAuthenticated()){
        Comment.find({},function(err,foundComments){
            if(err){
                console.log(err);
            }else{
                res.render("loggedinUser",{userName:req.user.username,comments:foundComments,skills:skills,projects:projects});
            }
        });
    }else{
        res.render("index",{skills:skills,projects:projects});
    }
});

app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});

app.get("/logout",function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/portFolio', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/portFolioAzure', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.post("/post",function(req,res){
    let userName = req.body.userName;
    let comment = req.body.comment;
    if(req.isAuthenticated()){
        User.findById(req.user.id,function(err,foundUser){
            if(err){
                res.redirect("/");
                console.log(err);
            }else{
                const newComment = new Comment({
                    name:userName,
                    comment:comment
                });
                newComment.save();
                foundUser.comment.push(newComment);
                foundUser.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect("/");
                    }
                });
            }
        });
    }else{
        alert("please Login to comment");
        res.redirect("/");
    }
});

app.post("/register",function(req,res){
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, 
                function () {
                res.redirect("/");
                });
        }
    });
});
app.post("/login",function(req,res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            });
        }
    }); 
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at server 8000");
});