const jwt = require('jsonwebtoken');
 const generateToken= (userId)=>{
    return jwt.sign({id:userId}, "KSJDNXJSKAJDSD" ,{
        expiresIn :"1d"
    });


 }
 module.exports=generateToken;