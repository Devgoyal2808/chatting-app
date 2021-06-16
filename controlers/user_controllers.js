const User = require('../models/user')

module.exports.profile=function(req,res){
    return res.render('userProfile',{
        title:'user'
    });
}

module.exports.signUp= function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign up"
    })
}

module.exports.signIn= function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign in"
    })
}


//get sign up data
module.exports.create =function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return(res.redirect('back'));
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in sign up');return}

        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user in sign up');return}

                console.log("dev");
                return res.redirect('/users/sign-in');
            })
        }
        else
        {
            return(res.redirect('back'));
        }
    });

}


module.exports.createSession =function(req,res){

}