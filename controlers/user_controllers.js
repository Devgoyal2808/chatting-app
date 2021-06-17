const User = require('../models/user')

module.exports.profile=function(req,res){

    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user){
            if(user)
            {
                return res.render('userProfile',{
                    title:'user Profile',
                    user:user
                });
            }

            return res.redirect('users/sign-in');
        });
    }
    else
    {
        return res.redirect('users/sign-in');
    }
    
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
    // 1 find user  2  handle user found  3 handle ps match  4 handle session creation 5 hndle user not fount

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in sign in');return}

        if(user)
        {
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            return res.redirect('back');
        }
    });

}