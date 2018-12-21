const express = require('express')
const mongoose = require('mongoose')
const Comments = require('../models/Comments');
const commentRoutes = express.Router();

function router(){
    commentRoutes.route('/')
        .get((req, res)=>{
            (async function query(){
                const comments =await Comments.find();
            
            console.log("AAAAAAAAAAAAAAAAA");
            console.log("length:" + comments.length)
            console.log("comment:" +comments.length);
            console.log("user:" + req.user);
            data ={
                comment: comments,
                username: req.user.username,
                secure: req.user.secure
            }
            
            res.render('comments', {data: data})
            }())
            
        })
    
    commentRoutes.route('/')
        .post((req, res, next) =>{
            console.log(req.body.my_comment);
            next();
            
        })

    return commentRoutes;
}

module.exports = router;
