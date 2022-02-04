const express= require('express');//not create a new instance

const router=express.Router();
const passport = require('passport');


const postApi= require("../../../controllers/api/v1/posts_api");

router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);
// session flase bcs we dont want session cookie to be generated
module.exports=router;