const joi= require('joi');


//  here validation of register 
const registorValidate=joi.object({

name: joi.string().required().min(3).messages({
  'string.empty': 'الاسم مطلوب', // إذا كان الحقل فارغاً
  'any.required': 'الاسم مطلوب', // إذا كان الحقل مفقوداً
  'string.min': 'الاسم يجب أن يحتوي على الأقل 3 أحرف', // إذا كان الاسم أقل من 3 أحرف
}),

email:joi.string().required().email().messages({
    'string.email': 'البريد الإلكتروني غير صحيح',
    'string.empty': 'البريد الإلكتروني مطلوب',
    'any.required': 'البريد الإلكتروني مطلوب',
  }),
password:joi.string().required().min(8).messages({
    'string.min': 'كلمة المرور يجب أن تكون على الأقل 6 أحرف',
    'string.empty': 'كلمة المرور مطلوبة',
    'any.required': 'كلمة المرور مطلوبة',
  }),
  skillsToteach:joi.string(),
  skillsTolearn:joi.string()

});


//    here validation pf login 
const loginValidate=joi.object({

   
    email:joi.string().required().email().messages({
        'string.email': 'البريد الإلكتروني غير صحيح',
        'string.empty': 'البريد الإلكتروني مطلوب',
        'any.required': 'البريد الإلكتروني مطلوب',
      }),
    password:joi.string().required().min(8).messages({
        'string.min': 'كلمة المرور يجب أن تكون على الأقل 6 أحرف',
        'string.empty': 'كلمة المرور مطلوبة',
        'any.required': 'كلمة المرور مطلوبة',
      }),
    
    })

    const editProfileValidate=joi.object({

      name: joi.string().min(3).messages({
        'string.empty': 'الاسم مطلوب', // إذا كان الحقل فارغاً
        'any.required': 'الاسم مطلوب', // إذا كان الحقل مفقوداً
        'string.min': 'الاسم يجب أن يحتوي على الأقل 3 أحرف', // إذا كان الاسم أقل من 3 أحرف
      }),
      
      email:joi.string().email().messages({
          'string.email': 'البريد الإلكتروني غير صحيح',
          'string.empty': 'البريد الإلكتروني مطلوب',
          'any.required': 'البريد الإلكتروني مطلوب',
        }),
      password:joi.string().min(8).messages({
          'string.min': 'كلمة المرور يجب أن تكون على الأقل 6 أحرف',
          'string.empty': 'كلمة المرور مطلوبة',
          'any.required': 'كلمة المرور مطلوبة',
        }),
        skillsToteach:joi.string(),
        skillsTolearn:joi.string()
      
      });
    module.exports={registorValidate ,loginValidate ,editProfileValidate};