const passport = require('passport');
const Users = require('../models/Users')
require('./strategy.local')();

module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    //store user in session
    passport.serializeUser((user, done) =>{
        console.log("Inside serialize user!")
        done(null, user);
    });

    //Retrieve user from session
    passport.deserializeUser((user, done) =>{
        //find user by Id
        console.log("Inside deserialize user!")
        Users.findById(id, (err, cb) =>{
            console.log(cb.username);
        let user = {
            username: cb.username,
            _id: cb._id
        } 
        console.log("user inside deserialize:" + user.username + user._id);
        done(null, user);
        })
    });

}