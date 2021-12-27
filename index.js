const express= require('express');
const app=express();
// port 80 run by default or when we deployed
const port = 8000;

// use express router (middleware)
// '/' for any url
app.use('/',require('./routes/index.js'));

app.set('view engine','ejs');
app.set('views','./views');




app.listen(port,function(err){
    if(err){
        console.log(`Error in runnin server : ${err}`);
    }
 console.log(`Server is running on port: ${port}`)
});
