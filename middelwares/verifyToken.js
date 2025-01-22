const jwt=require('jsonwebtoken');


const verifyToken=async(req,res,next) =>{

const token = req.cookies.token;
console.log(token);

//   التحقق من وجود ال  token
if (!token)
{
    return res.status(400).json({error: 'غير مصرح لك بالدخول'}) ;
}
try{

    const decoded=jwt.verify(token,'KSJDNXJSKAJDSD');
  
    req.userId=decoded.id;
    console.log('Decoded User ID:', req.userId); //
    
    next();
}
catch(error)
{
    return res.status(401).json({error:'رمز الدخول غير صحيح'});
}

}
module.exports=verifyToken;