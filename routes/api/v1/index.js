const express= require('express');//not create a new instance

const router=express.Router();

router.use('/posts',require('./posts'));
router.use('/users', require('./users'));

module.exports=router;