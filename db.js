var mysql = require('mysql');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var config = {
    host: 'localhost',
    user: 'kaushal7',
    password: '1234',
    database: 'brrout'
};

var userName="";
var bcrypt=require('bcryptjs');
var connection=mysql.createConnection(config);

function createConnection() {
    connection.connect();
    console.log("DB_DB");

}
function createUser(newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            password=hash;

        });
    });
}
function comparePassword(password1,password2,callback) {
    console.log("HELLO)hjhj");

}
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

function getUserByUsername(username,callback) {
    console.log("HELLO");
    if(userName=username)
    {
        console.log("YAHAN AA RHA HAI "+userName);

        connection.query('select * from login where username="'+username+'"',function (err,data) {
            console.log("DATA.. "+data.keys());
            for (var key in data) {
                var obj = data[key];
                console.log(key);
                for(var key in obj)
                {
                    console.log("OBJ"+obj[key]+"key"+key);
                }

            }
            if(err)
            {
                callback(err,userName);
            }
            else if(username==undefined)
            {
                callback(false,false);
            }
            else{
                console.log("Data"+data.username+" "+data.password);
                callback(false,username);
            }
            //Data=data;
            console.log("USERNAME"+username);
            //    callback(data);

            // return JSON.stringify(err);
        })

    }

}

module.exports={
    connect:createConnection,
    getUserByUsername:getUserByUsername,
    comparePassword:comparePassword
}
