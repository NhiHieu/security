const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('index:local.strategy');
const Users = require('../models/Users')
module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req,username, password, done) =>{
        //console.log("Inside callback strategy")
        (async function mongo(){
        try {
            const user =await Users.findOne({ username });
            console.log("Inside local strategy mongo function");
            console.log(user);
            if(!user){
                done(null, false);
            }
            else{
            if(user.password === password){
                done(null, user);
            }
            else{
                done(null, false);
            }
        }
        } catch (err) {
            debug(err.stack);
        }
        
        }());
    }
));
}