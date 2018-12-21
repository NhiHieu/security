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
            const user =await Users.findOne({ username: username, password: password});
            console.log("Inside local strategy mongo function");
            console.log(user);
            //if(!user){
            // if(2<1){
            //     done(null, false);
            // }
            // else{
            // if(user.password === password){
            //     done(null, user);
            // }
            // else{
            //     done(null, false);
            // }
            if(!user){
                console.log("Cannot use json to pass passport!")
                done(null, false);
            }else{
                done(null, user);
            }
        //}

        //const user = await Users.find({username: username, password: password});
        //console.log("user"+user);
        //done(null, user);
        } catch (err) {
            debug(err.stack);
        }
        
        }());
    }
));
}