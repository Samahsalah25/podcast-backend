const UserSchema=require('../models/User');
const {editProfileValidate} =require('../validator/userValidator');
const {hashPassword , comparePassword}=require("../utlis/hashPassword");

//  لعرض الداتا بتاعت اليوزر

const viewProfile=async(req ,res)=>{
const {id} =req.params;

try{
const user =await  UserSchema.findById(id,{password:0});
console.log('id is '+id);

if(!user) return res.status(400).json(' لا يوجد هذا المستخدم');

return res.status(200).json(user);

}

catch(error)
{
    return res.status(400).json(' حدث خطأ اثناء الحصول علي معلوماتك')
}
}

//  تعديل البروفايل
const editProfile =async(req ,res)=>
{
const {error}=editProfileValidate.validate(req.body);
if (error) return res.status(400).json({error:error.details[0].message});

const {id}=req.params;
const {name , email ,skillsToteach,skillsTolearn}= req.body;



try{
    const user= await UserSchema.findOne({email :email});
 
    
    if (user && user._id !=id) return res.status(400).json('هذا البريد الالكتروني مستخدم بالفعل');
  
    const newdata= await UserSchema.findByIdAndUpdate(id ,{name , email ,skillsTolearn ,skillsToteach});

    return res.status(200).json(' لقد تم تعديل البيانات بنجاح')
  
}
catch(error)
{
    return res.status(300).json({error:' حدث خطأ اثناء تعديل البيانات'});
}

}

// edit password
const editPassword= async(req,res)=>{
const {currentPassword ,newPassword} =req.body;

const {error} = editProfileValidate.validate({password:newPassword})
if (error) return res.status(400).json({error:error.message});

const {id} =req.params;
console.log(id);

 try{
    const user =await UserSchema.findById(id);
    console.log(user);
    if ( !user)   return res.status(404).json('  هذا المستخدم غير موجود')
    const validPassword= await comparePassword(currentPassword ,user.password);
       
    if (!validPassword)
    {
        return res.status(400).json('  لقد ادخلت كلمة المرور غير صحيحة');
    }
    const hashnewPassword =await hashPassword(newPassword);
    const newuser =await UserSchema.findByIdAndUpdate(id ,{password:hashnewPassword});
    return res.status(200).json(' لقد تم تغيير كلمة المرور بنجاح');
 }
 catch(error)
 {
    return res.status(400).json({error:' لقد حدث خطأ اثناء تغيير كلمة المرور'})

 }

}
// حذف الحساب 
 const deleteAccount= async(req ,res)=>{
 const {id}=req.params;
 
 try{
    const userdeleted=await UserSchema.findByIdAndDelete(id);
     if(!userdeleted)
     {
        return res.status(400).json('  هذا المستخدم غير موجود')
     }
   res.clearCookie('token');
    return res.status(200).json('  لقد تم حذف الحساب بنجاح');
 }
 catch(error)
 {
    return res.status(400).json({error:' حدث خطأ اثناء حذف الحساب'})
 }



 }


module.exports={viewProfile ,editProfile,editPassword ,deleteAccount};