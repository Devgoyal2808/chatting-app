const express = require('express');
const cookieParser= require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie....
const session=require('express-session');
const passport = require('passport');
const passportLocal=require('./config/passport-local');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
// extract style and scripts from page specific
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static('./assets'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


// mongo store is used to store session cookie in the db
//middleware for session and sign in using cookies
app.use(session({
    name: 'codial',
    secret: 'somerandomencrykey',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
    {
        mongoUrl:'mongodb://localhost/codeial_development',
        mongooseConnection: db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect - mongo db setup');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        // console.log{'error',err};
        console.log(`Error in running server ${err}`);
    }

    console.log(`Server is running on ${port}`);
});