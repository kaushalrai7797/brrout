var express=require('express');
var path= require('path');
var router=express.Router();
var cookieParser= require('cookie-parser');
var body_parser= require('body-parser');
var expressHandlerbars= require('express-handlebars');
var expressValidator= require('express-validator');
var connectFlash= require('connect-flash');
var expressSession= require('express-session');
var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;
var db=require('./db.js');
var bcrypt=require('bcryptjs');
var app=express();

app.set('port',(process.env.PORT||3000));


app.listen(app.get('port'),function () {
    console.log("server listening to 3000");
    db.connect();
});

app.use('/register',express.static('personal'));
app.use('/login',express.static('public'));
app.use('/',express.static('personal'));

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

var userName="";
var passWord="";
// app.post('/login',function (req,res) {
//
//     console.log(req.body.username);
//     userName=req.body.username;
//   /*  db.getUserByUsername(username,function () {
//         console.log("AB KYA BTAu");
//     })*/
// });
var a;
passport.use(new LocalStrategy(
    function(username, password, done) {
        db.getUserByUsername(username,function (err,user) {
            if (err) {
                console.log("Err aa gya");
                throw err;
            }
            if (!user){
                console.log("SERVER PASSPORT");
                return done(null , false , {message : 'unkown user'});
            }
            else {
                console.log("NO ERR");
                db.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'password not correct'});
                    }

                })
            }

        });

    }
));


//SOCKET.IO

const http = require('http');
const httpInstance = http.Server(app);

const socket = require ('socket.io');
const io = socket(httpInstance);

var messages = [];

var users = [];

io.on('connect' , function (socket) {


    socket.on ('adduser' , function (data) {
        users.push(data);
        console.log(data);
        socket.username= data;
        socket.emit('alluser' , users);
        io.emit ('everyuser' , users);

    })


    socket.on('msg', function (data) {
        messages.push({data: data, socketID : socket.username})
        console.log(data);
        console.log(socket.id);
        socket.emit('all' , messages);
        io.emit ('everybody' , messages);
    })

});


app.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}),function (req,res) {
    console.log("passport authenticate");
   // res.redirect('/');

});
