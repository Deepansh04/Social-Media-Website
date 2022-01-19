const express=require('express');

const router=express.Router();
const passport=require('passport');
console.log('users');
const usersController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);


router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
// use passport as a middleware in athentication

router.post('/create-session',passport.authenticate('local',
 {failureRedirect:'/users/sign-in'}
),usersController.createSession);

router.get('/sign-out',usersController.distroySession);
module.exports=router;
