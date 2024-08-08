const Doctor = require('../Models/doctors.model');
const Doctors=require('../Models/doctors.model');
const express=require('express');
const router=express.Router();
const jwt=require("jsonwebtoken")
const User=require('../Models/user.model');
router.post('/dept',async(req,res)=>{
    const {dept}= req.body;
    console.log(req.body);
    const doctors=await Doctors.find({dept:dept});
    res.send(doctors);
});

router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const doctors=await Doctors.findOne({_id:id});
    res.send(doctors);
});
router.post('/all',async(req,res)=>{
    const doctors=await Doctors.find();
    res.send(doctors);
});
router.post('/patients',async(req,res)=>{
    const users=await User.find();
    res.send(users);
});
const validateToken = (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.status(400).send("Authentication required!");

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(400).send("Invalid Token!");
        req.user = decoded;
        next();
    });
};
// Route to get doctor details

module.exports=router