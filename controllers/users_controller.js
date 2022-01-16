const User=require('../models/user');

module.exports.profile=function(req,res){
    res.render('user_profile',{
        title:'user_profile'
    })
}
// render sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
                 title:"Codial | Sign Up"
    });
}
// render sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');

    }
    return res.render('user_sign_in',{
        title:"Codial | Sign In"
    });
}
// get the sign up data
module.exports.create=function(req,res){
   if(req.body.password!=req.body.confirm_password){
       return res.redirect('back');
   }
   User.findOne({email: req.body.email},function(err,user){
       if(err){console.log('Error in finding user signing up'); return;}
       if(!user){
           User.create(req.body,function(err,user){
               if(err){console.log('error in creating user while signing up');return;}
           })
           return res.redirect('/users/sign-in');
       }
       else{
           res.redirect('back');
       }
   })
}
// sign in create a session for user
module.exports.createSession =function(req,res){
    return res.redirect('/');
}



module.exports.distroySession = function(req, res){
    req.logout();// inbuild fun came with request bcs we require passport
    return res.redirect('/');
}