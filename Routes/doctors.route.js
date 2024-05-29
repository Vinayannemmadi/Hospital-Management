const Doctors=require('../Models/doctors.model');
const express=require('express');
const router=express.Router();

router.post('/dept',async(req,res)=>{
    const {dept}= req.body;
    console.log(req.body);
    const doctors=await Doctors.find({dept:dept});
    res.send(doctors);
})

module.exports=router