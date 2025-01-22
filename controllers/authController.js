const {registorValidate ,loginValidate}=require('../validator/userValidator');
const UserSchema= require( '../models/User');
const {hashPassword , comparePassword}=require("../utlis/hashPassword");
const generateToken= require('../utlis/generateToken');

const Register= async(req ,res)=>{
  
    const {error}= registorValidate.validate(req.body);

    if (error) return res.status(400).json({error: error.details[0].message});
    const {name ,email,password , skillsToteach, skillsTolearn}= req.body;
    

    try{
        //   التحقق من ان البريد الالكتروني موجد ام لا
   
        const existingUser= await UserSchema.findOne({email});
        if (existingUser)
        {
            return res.status(400).json({error: " البريد الالكتروني موجود بالفعل"});
        }
//   تشفير كلمة المرور
        const Hashingpassword= await hashPassword(password);
        
        //  تسجيل مستخد جديد
        const user =new UserSchema({name ,email ,password:Hashingpassword ,skillsToteach ,skillsTolearn});
        console.log(req.body.password + 'hgfhgfhgf')
       await  user.save();
     
       res.status(201).json({message:" تم انشاء حساب جديد"})

    }

catch(error){
    res.status(500).json({error:error.message});

}

}

// تسجيل الدحول

const Login =async(req , res)=>{
       const {error}= loginValidate.validate(req.body);
       
       if (error) return res.status(400).json({error:error.details[0].message});
       const {email , password}=req.body;
    try {
     
          //     التحقق من البريد الالكتروني
       const existingUser= await UserSchema.findOne({email});
       if (!existingUser) return res.status(401).json({error:'البريد الالكتروني غير صحيح'});
   
    
    //     التحقق من كلمة المررور
 const matchPassword= await comparePassword(password,existingUser.password);

 
 if (!matchPassword) return res.status(400).json({error:'كلمة المرور غير صحيحة '});

 
 const token= generateToken(existingUser._id);
 res.cookie('token', token, {
    httpOnly: true, // لا يمكن الوصول إلى الـ Cookie من خلال JavaScript
    secure: process.env.NODE_ENV === 'production', // استخدام HTTPS في الإنتاج
    maxAge: 3600000, // صلاحية الـ Cookie لمدة ساعة (بالمللي ثانية)
  });
 res.status(200).json('تم تسجيل الدخول بنجاح');

    }
    catch( error){
        res.status(400).json({error:error.message});

    }


}
//  تسجيل خروج
const logout=async(req, res)=>{

try{
    res.clearCookie('token');
    return res.status(400).json('  لقد تم تسجيل الخروج ')
    
}
catch(error)
{
    return res.status(400).json('  حدث خطأ اثناء تسجيل الخروج ')
}

}
module.exports={Register ,Login ,logout};