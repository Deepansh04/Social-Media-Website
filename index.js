const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
// port 80 run by default or when we deployed
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const { urlencoded } = require('express');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'))
app.use(expressLayouts); // by default layout.ejs is naming used for layout
// use express router (middleware)
// '/' for any url
app.use('/',require('./routes/index.js'));
// extract styles and script from subpages into layoutc
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');




app.listen(port,function(err){
    if(err){
        console.log(`Error in runnin server : ${err}`);
    }
 console.log(`Server is running on port: ${port}`)
});
