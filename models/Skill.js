const mongoose=require('mongoose');
const skillSchema=mongoose.Schema({

    name: { type: String, required: true }, // اسم المهارة (يجب أن يكون فريداً)
    description: { type: String }, // وصف المهارة
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

})
const SkillSchema=mongoose.model('Skill' ,skillSchema)
module.exports=SkillSchema