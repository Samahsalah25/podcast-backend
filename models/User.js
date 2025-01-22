const mongooes=require('mongoose');
const userSchema=mongooes.Schema({
 name:{type:String , required:true},
 email:{ type:String , required:true , unique:true},
 password:{type:String },
 skillsToteach:[{type:String}],
 skillsToLearn:[{type:String}],



})
const UserSchema=mongooes.model('User' ,userSchema)
module.exports=UserSchema