const express= require('express');//not create a new instance

const router=express.Router();
const homeController=require('../controllers/home_controller')


router.get('/',homeController.home);
router.use('/users',require('./users'))
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports=router;//exports=router ; will not work here
