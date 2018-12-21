const express = require('express');
const server = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/security', {useNewUrlParser: true});
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const Users = require('./models/Users')
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.set('views', path.join(__dirname, '/source/views'));
server.set('view engine', 'ejs');

server.use(express.static(path.join(__dirname, '/public/')));

server.get('/',(req, res)=>{
    res.render('login');
})

const check = function valid(req, res, next){
    const {username, password} = req.body;
    console.log(username +"  " + password);

    if (username && typeof username !== 'String')
        return res.redirect('/');

    if (password && typeof password !== 'String')
            return res.redirect('/');
    next();
}

server.post('/',(req, res)=>{
    const {username, password} = req.body;
    console.log(username +"  " + password);
    (async function query(){
        // if(username == undefined || typeof username !== 'String' || password == undefined || typeof password !== 'String'){
            
        //     res.redirect('/');
        // }
        //else{
        await Users.find({username: username, password: password}, (err, user)=>{
            if(err)
                console.log(err)
            if(!user)
                res.redirect('/')
            else{
                console.log(user);
                res.redirect('/profile');
            }
        })
    //}
    }())
})
server.get('/profile', (req, res)=>{
    res.render('profile')
})
server.listen(4000, ()=>{
    console.log("ok");
})