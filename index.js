const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const config = require('./config')
const Comments = require('./models/Comments')




const app = express()

//Socket io
const http = require('http').Server(app);
const io = require('socket.io')(http);


//connect mongoose
mongoose.connect('mongodb://localhost/security', {useNewUrlParser: true});
db = mongoose.connection;
db.on('error',console.log.bind(console,'connection error:'));
db.once('open', function(){
    console.log("opened")
})

//middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Cookie and session
app.use(cookieParser());
app.use(session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection:'sessions'} ),
    cookie: {expires: 1000000}
}))

app.use((req, res, next) => {
	if(req.cookies.user_sid && !req.session.user)
		res.clearCookie('user_sid');
	 next();
});

require('./ConfigPassport/passport')(app);
app.set('views', path.join(__dirname, '/source/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));

//routes
const loginRouter = require('./routes/loginRoutes')();
const commentRouter = require('./routes/commentRoutes')();

app.use('/', loginRouter);
app.use('/comments', commentRouter);



//Handle socket
// io.on('connection',function(socket){
//     socket.on('sendFromClient', function(data){
//         console.log("sendFromClient:" + data);
//         socket.broadcast.emit('sendFromSever', data);
//     })

// });

function escape(str){
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;');
  };


io.on('connection', function(socket){
    socket.on('chat message', function(data){
        // data.username = escape(data.username);
        // data.description = escape(data.description);
        const comment = new Comments({author: data.username, description: data.msg});
        comment.save();
        io.emit('chat message', data.msg);
      });
})



http.listen(config.PORT, ()=>{
    console.log(`Listening on port ${chalk.green(config.PORT)}`)
})