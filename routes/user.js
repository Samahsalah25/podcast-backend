const express= require('express');
const router=express.Router();
const verifyToken=require('../middelwares/verifyToken');
const {viewProfile,editProfile ,editPassword ,deleteAccount}=require('../controllers/userController')



// view profile
router.get('/:id' ,verifyToken , viewProfile);
router.patch('/:id' ,verifyToken ,editProfile);
router.patch('/password/:id' ,verifyToken ,editPassword)
router.delete('/:id' ,verifyToken ,deleteAccount)


module.exports=router;
