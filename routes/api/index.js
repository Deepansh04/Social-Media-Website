const express= require('express');//not create a new instance

const router=express.Router();

router.use('/v1',require('./v1'));

module.exports=router;