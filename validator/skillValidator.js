const joi =require('joi');

const skillValidator= joi.object({

name: joi.string().required().min(3).messages({
    'string.empty': 'الاسم مطلوب', // إذا كان الحقل فارغاً
    'any.required': 'الاسم مطلوب', // إذا كان الحقل مفقوداً
    'string.min': 'الاسم يجب أن يحتوي على الأقل 3 أحرف', // إذا كان الاسم أقل من 3 أحرف
  }) ,
description: joi.string().min(5).messages({
    'string.empty': 'الاسم مطلوب', // إذا كان الحقل فارغاً
    'string.min': 'الاسم يجب أن يحتوي على الأقل 5 أحرف', // إذا كان الاسم أقل من 3 أحرف
  }) , 


})
const skillValidatorUpdated= joi.object({

    name: joi.string().min(3).messages({
        'string.empty': 'الاسم مطلوب', // إذا كان الحقل فارغاً
        'any.required': 'الاسم مطلوب', // إذا كان الحقل مفقوداً
        'string.min': 'الاسم يجب أن يحتوي على الأقل 3 أحرف', // إذا كان الاسم أقل من 3 أحرف
      }) ,
    description: joi.string().min(5).messages({
        'string.empty': 'الاسم مطلوب', // إذا كان الحقل فارغاً
        'string.min': 'الاسم يجب أن يحتوي على الأقل 5 أحرف', // إذا كان الاسم أقل من 3 أحرف
      }) , 
    
    
    })
module.exports={skillValidator ,skillValidatorUpdated};