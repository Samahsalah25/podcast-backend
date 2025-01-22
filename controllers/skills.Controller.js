const SkillSchema= require('../models/Skill');
const {skillValidator ,skillValidatorUpdated}=require('../validator/skillValidator');


// الحصول علي جميع المهارات المستخدم
 const getSkills=async(req ,res)=>{

const userId=req.userId;
console.log(userId);

try{
    const skills=await SkillSchema.find({userId} ,{name:1  ,description:1});
    if (!skills) return res.status(400).json('لا توجد مهارات يمكنك اضافة مهارات');

    return res.status(200).json(skills);
}

catch(error)
{
    return res.status(400).json({error:' لم نستطيع ايجاد المهارات'})
}

 }



// لانشاء مهارة جديدة
const createSkill=async(req ,res ) =>{

const {error}= skillValidator.validate(req.body);
if (error) {
    return res.status(401).json({error:error.details[0].message});
}

const {name ,description}= req.body;
const userId=req.userId;
console.log(req.body);
try{

    const newskill= new SkillSchema({name , description ,userId});
    
    
    await newskill.save();
    res.status(200).json(' تم اضافة مهارة جديده بنجاح');
}
catch(error)
{
   console.error(error)
    return res.status(400).json({error:' حدث خطأ لم يتم اضافة مهارة جديده'})
}


}
//  التعديل في مهارة معينه 
const updateSkill =async(req , res)=>{

const {error}= skillValidatorUpdated.validate(req.body);
if (error) return res.status(400).json({error:error.details[0].message});
const {name , description}= req.body;
const {id}=req.params;
try{
const skillupdate=await SkillSchema.findByIdAndUpdate(id ,{name ,description})

if (!skillupdate) return res.status(400).json(' المهارة غير موجودة')

return res.status(200).json('تم التعديل بنجاح');

}
catch(error)
{
    return res.status(400).json({error:'حدث مشكلة اثناء التعديل'})
}

}

// مسح مهارة للمستخدم

const deleteSkill =async(req,res)=>{

const {id}=req.params;
try{

    const userdeleted=await SkillSchema.findByIdAndDelete(id)
     if (!userdeleted) return res.status(400).json(' بم يتم ايجاد هذه المهارة');

    return res.status(200).json('تم حذف المهارة بنجاح')
}
catch(error)
{
    return res.status(400).json({error:'حصل حطأ اثناء الحذف'})
}

}
module.exports={createSkill ,getSkills ,updateSkill,deleteSkill};