


const ensureToken =(req,res ,next)=>{

const token =req.cookies.token;
 if (token)
 {
   return res.status(400).json({error:'عليك تسجيل الخروج اولا'})

 }
 next()

}
module.exports=ensureToken;