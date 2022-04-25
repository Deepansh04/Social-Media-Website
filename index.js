const express= require('express');
const env= require('./config/environment');
const logger= require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);

// port 80 run by default or when we deployed
const port = process.env.PORT || 8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// uses for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal= require('./config/passport-local-strategy');
const passportJWT= require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const { urlencoded } = require('express');
const flash= require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path=require('path');
// const sassMiddleware=require('node-sass-middleware');
// app.use(sassMiddleware({
//     src:'./assets/scss', // from this folder
//     dest:'/assets/css', // move to this folder
//     debug: true, // termial m error
//     outputStyle:'extended', // in multiple lines
//     prefix:'/css' // prefix already given
// }));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(env.asset_path));

// make the upload path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts); // by default layout.ejs is naming used for layout

// extract styles and script from subpages into layoutc
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');
// mongo store is used to store the session cookie in db

app.use(session({
    name: 'codial' ,
//  Todo change the secreate after deployment
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
         maxAge:(1000*60*100) // in milliseconds the time for which its there 
   },
   store:  MongoStore.create({
       mongoUrl: 'mongodb://localhost/codeial_development',
       autoRemove :'native'// means it shd not be removed after the time gets over
   },function(err){
       console.log(err || 'connect-mongodb setup' );
   })
}));
app.use(passport.initialize()); // initialize the passport
app.use(passport.session()); // create session for cookies
app.use(passport.setAuthenticatedUser); // call the middleware to store users in locals
// use express router (middleware)
// '/' for any url
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes/index.js'));

app.use(logger(env.morgan.mode,env.morgan.options));

app.listen(port,function(err){
    if(err){
        console.log(`Error in runnin server : ${err}`);
    }
 console.log(`Server is running on port: ${port}`);
});
