const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User= require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
usernameField:'email' // this email is from frontend data
},
function(email,password,done){ // email and password are forntend feild
    // find the user and establish the identity
    User.findOne({email:email},function(err,user){   // email db , email frontend
        if(err){
            console.log('Error in finding user -->passport');
            return done(err);
        }
        if(!user || user.password !=password){
            console.log('Invalid username/Password');
            return done(null,false);
        }
        return done(null,user);
    });
}
));
// serializing the user to decide which key  is to bekept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
// deserializing the user from the key in cookies

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in fiding user -->passport');
            return done(err);
        }
        return done(null,user);
    });
});
// check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in , then pass on the request to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user containes the current signed in user form session cookie and we are just sending it to the locals for the views
        res.locals.user=req.user;
    }
    return next();
}
module.exports=passport;