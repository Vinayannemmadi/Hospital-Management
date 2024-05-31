const Doctors=require('../Models/doctors.model');
const express=require('express');
const router=express.Router();

router.post('/dept',async(req,res)=>{
    const {dept}= req.body;
    console.log(req.body);
    const doctors=await Doctors.find({dept:dept});
    res.send(doctors);
})
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const doctors=await Doctors.findOne({_id:id});
    res.send(doctors);
})

module.exports=router