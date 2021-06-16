const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"error in connection to mongodb"));

db.once('open',function(){
    console.log('connection to mongo DB established');
});


module.exports=db;