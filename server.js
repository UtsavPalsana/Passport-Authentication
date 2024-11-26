const express = require ('express');
const { connectMongoose,User } = require('./database');
const app = express();
const ejs = require("ejs");
const passport  = require('passport');
const { initializingPassport, isAunthenticated } = require("./passportConfig.js");
const  expressSession  = require("express-session");



connectMongoose();
initializingPassport(passport);

app.use(express.json( )); // middleware
app.use(express.urlencoded({ extended: true}) ); 
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized:false } ));
app.use(passport.initialize());
app.use(passport.session());

app.get( '/', (req, res) => {
    res.render("index.ejs");
});

app.get("/register",(req,res)=>{
    res.render("register.ejs")
});

app.get("/login", (req,res)=>{
    res.render("login.ejs")
});



app.post("/register",async(req,res) =>{
    const user = await User.findOne( { username: req.body.username } );

    if(user) return res.status(400).send("User already exists");

    const  newUser = await User.create(req.body);
    res.status(201).send(newUser);
});

app.post("/login", passport.authenticate("local",{failureRedirect:"/register" , successRedirect:"/"})
    
);

app.get("/profile",isAunthenticated ,(req,res)=> {
    res.send(req.user)
})



app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
