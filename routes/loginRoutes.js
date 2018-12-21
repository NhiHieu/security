const express = require('express')
const mongoose = require('mongoose')
const Users = require('../models/Users');
const loginRoutes = express.Router();
const passport = require('passport');
function router(){


//Handle login 
    loginRoutes.route('/')
        .get((req, res)=>{
            console.log(req.cookies);
            console.log(req.session);
            //console.log(req.)
            
            res.render('login');
        })
    
    // loginRoutes.route('/')
    //     .post((req, res) =>{
    //         //const {username, password} = req.body;
    //         const username = "sd";
    //         const password = "fs";
    //         console.log("username:"+username);
    //         (async function query(){
    //             const user = await Users.find({username: username, password: password});
    //             if(!user)
    //                 res.redirect('/')
    //             else{
    //                 req.login(user, (err)=>{
    //                     if (err) { console.log(err) }
    //                     res.locals.user = user;
    //                     return res.redirect('/comments');
    //                 });
    //             }
    //         }())
            
    //     })

    loginRoutes.route('/')
    .post(passport.authenticate('local',
        {
        successRedirect: '/comments',
        failureRedirect: '/'
    }))


//Handle signup
    loginRoutes.route('/signup')
        .get((req, res) =>{
            res.render('signup')
        })
    
        loginRoutes.route('/signup')
            .post((req, res)=>{
                //console.log("res.body:" + req.body);
                
                
                const {username, password} = req.body;
                console.log(username+ " " + password);
                (async function create(){
                    
                    try{
                        const user  = await Users.create({username, password});
                        console.log(user);
                        req.login(user, function(err) {
                            if (err) { console.log(err) }
                            res.locals.user = user;
                            return res.redirect('/comments');
                          });
                    }catch(err){
                        console.log(err);
                        res.redirect('/');
                    }
                }())
            })

    return loginRoutes;
}


module.exports = router;