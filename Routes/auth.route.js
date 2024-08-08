const express=require('express');
const router=express.Router();
const {signin,signup,deleteAcc,getProfile}=require('../Controllers/auth.controller');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../Models/user.model');
const Admin =require("../Models/admin.model");
const Doctor = require('../Models/doctors.model');

router.post('/signin',signin);
router.post('/signup',signup);
router.post('/deleteAcc',deleteAcc);
// router.post("/getProfile",getProfile);

const validateToken=(req,res,next)=>{
    const {token}=req.body;
    if(!token)
        return res.status(400).send("Authentication required!");
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err)res.status(4000).send("Invalid user!");
        req.user=decoded;
        next();
    });
}
router.post("/getProfile",validateToken,async(req,res)=>{
    const {token}=req.body;
   const user=await User.findOne({_id:req.user._id});
   if(user)
    return res.send(user);
   const admin=await Admin.findOne({_id:req.user._id});
   if(admin)
    return res.send(admin); 
   const doctor=await Doctor.findOne({_id:req.user._id});
   if(doctor)
    return res.send(doctor);
   return res.send("No user found!");

})
router.post("/admin/signin",async(req,res)=>{
    const {email,password,username}=req.body;
    if(!req.body ||!req.body.email || !req.body.password)
            return res.send("Give valid credentials!");
    console.log(email);
    try{
        const admin=await Admin.findOne({email:email});
        if(!admin)return res.status(400).send("You are not Admin! HaHaHa");
        if(req.body.password==admin.password)
        {
            const token={
                isAdmin:true,
                id:admin._id
            }
            return res.send(token);
        }
        res.send("Incorrect password :)");
        return;
    }
    catch(error){
        console.log(error);
        return res.send("Login failed :(");
    }

});
router.post("/admin/signup",async(req,res)=>{
    const {email,password,username}=req.body;
    if(!email || !password || ! username)
        return res.status(400).send("Something is missing!");
    try{
        const admin= new Admin({email,password,username});
        await admin.save();
        return res.send("Admin saved")
    }catch(err){
        console.log(err);
        return res.status(400).send("Server failed!");
    }
});

module.exports=router;
