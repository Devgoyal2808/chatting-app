const express = require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');


app.use(expressLayouts);
// extract style and scripts from page specific
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes'));
app.use(express.static('./assets'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        // console.log{'error',err};
        console.log(`Error in running server ${err}`);
    }

    console.log(`Server is running on ${port}`);
});