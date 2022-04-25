const  fs= require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogSteam = rfs.createStream('access.log',{
    interval: '1d',
    path:logDirectory
});

const development ={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'deepansh338@gmail.com',
            pass: '@deepansh#338'
        }
    },
    google_client_iD: '211215557254-99egtj920d8vlk2aajga51pdr4a0h2dj.apps.googleusercontent.com', 
       google_client_secret: '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', 
      google_call_back_url  : "https://connect-people-and-learn.herokuapp.com//users/auth/google/callback",
      jwt_secret :'codeial',
      morgan:{
          mode:'dev',
          options:{stream:accessLogSteam}
      }
}

const production={
    name:'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    }, 
    google_client_iD: process.env.CODEIAL_GOOGLE_CLIENT_ID, 
       google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
      google_call_back_url  : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
      jwt_secret :process.env.CODIAL_JWT_SECRET,
      morgan:{
        mode:'combined',
        options:{stream:accessLogSteam}
    }
}

module.exports=eval(process.env.CODEIAL_DEVELOPMENT)==undefined? development : eval(process.env.CODEIAL_DEVELOPMENT);