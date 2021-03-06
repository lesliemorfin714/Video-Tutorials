const dotenv = require('dotenv');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const express = require('express');
const User = require('./models/User');
const Course = require('./models/Course');
const config = require('./config/config')[env];
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = require('express')();
// const cubeRoutes = require('./routes/cubeRoutes');
const sessions = require('express-session');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
app.use(cookieParser());


require('./config/express')(app);
require('./config/routes')(app);

//session middleware
// app.use(sessions({
//   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//   saveUninitialized:true,
//   cookie: { maxAge: oneDay },
//   resave: false
// }));
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// Setup the engine 
app.engine('hbs', handlebars({
  extname:'.hbs', 
  partialsDir:__dirname+'/views/partials', 
  
}))
app.set('views', __dirname+'/views');
app.set('view engine', 'hbs')

// cookie parser middleware
app.use(cookieParser());

// middlewares
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res)=>{
  res.render('../views/404.hbs')
})

// Routes Defined
/* 
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/course", courseRouter);
app.use("/user", userRouter); 

*/

// app.use(cubeRoutes);
// app.use(accessoryRoutes);

app.use((req, res)=>{
  res.render('../views/404.hbs')
})

// app.use(cubeRoutes);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

// mongo db connection
console.log(process.env.DB_URI)
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((res) => console.log("Your db is connected."))
    .catch((err) => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

// Route Handlebars Templates
/* var homeRouter = require("./routes/home");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var registerRouter = require("./routes/register");
var courseRouter = require("./routes/course");
var userRouter = require("./routes/user"); */

