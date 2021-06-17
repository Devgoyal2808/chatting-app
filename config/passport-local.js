const passport= require('passport');

const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function (email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("error in finding user -->passport");
                return done(err);
            }

            if(!user || user.password!=password){
                console.log('Invalid username password');
                return done(null,false);
            }

            return done(null,user);
        });
    }
));


// serialize the user to know which key is kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// serialize the user to know which key is kept in cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user -->passport");
            return done(err);
        }
        return done(null,user);
    });
});


//check if user is authenticated
passport.checkAuthentication= function(req,res,next){
    // if user is signed in , pass the request to next controller 
    if(req.isAuthenticated()){
        return next();
    }

    //in case user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated())
    {
        // req.user contain the current signin user....
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;