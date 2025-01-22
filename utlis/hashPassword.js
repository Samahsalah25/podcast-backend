const bcrypt=require('bcrypt');


//  to hash passwword
const hashPassword=async(password)=>{
const seltround=10;
return bcrypt.hash(password , seltround);
}

//  to compare password 
 const comparePassword= async (passwrod , hashPassword)=>{
    return  await bcrypt.compare(passwrod ,hashPassword)

 }
 module.exports={hashPassword , comparePassword};