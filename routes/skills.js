const express= require('express');
const router=express.Router();
const { createSkill ,getSkills ,updateSkill ,deleteSkill  }=require('../controllers/skills.Controller');
const verifyToken=require('../middelwares/verifyToken');

router.get('/',verifyToken ,getSkills)
router.post('/',verifyToken,createSkill);
router.put('/:id' ,verifyToken,updateSkill );
router.delete('/:id' ,deleteSkill )

module.exports=router;

