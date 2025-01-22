const express=require('express');
const router=express.Router();
const {Register ,Login,logout}=require('../controllers/authController');
const ensureToken=require('../middelwares/ensureToken');
const verifyToken=require('../middelwares/verifyToken')


//  1) to register new user
router.post('/register' ,ensureToken,Register);
router.post('/login',ensureToken ,Login);
router.post('/logout' ,verifyToken,logout);
// 3) logout


module.exports=router;