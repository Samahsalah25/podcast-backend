const express= require('express');
const router=express.Router();
const {createSession} =require('../controllers/sessionControllers');
const verifyToken=require('../middelwares/verifyToken');

 router.post('/',verifyToken,createSession);




 module.exports=router;