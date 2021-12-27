const express= require('express');
const app=express();
// port 80 run by default or when we deployed
const port = 8000;

app.listen(port,function(err){
    if(err){
        console.log(`Error in runnin server : ${err}`);
    }
 console.log(`Server is running on port: ${port}`)
});
