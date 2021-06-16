module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('dev',25);
    return res.render('home',{
        title:"home"
    });
}