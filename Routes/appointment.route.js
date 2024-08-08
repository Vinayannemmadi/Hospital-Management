const express=require("express");
const router=express.Router();
const Appointment=require("../Models/appointment.model");
const User=require("../Models/user.model");
const jwt=require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config();

const validateToken=(req,res,next)=>{
    const{token}=req.body;
    if(!token)
        return res.status(400).send("Authentication required!");
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err)res.status(4000).send("Invalid user!");
        req.user=decoded;
        next();
    });
};
router.post("/general",validateToken,async(req,res)=>{
    // console.log(req.body);
    try{
        const status="Pending";
        const isSpecial=false;
        const{firstname,lastname,email,
            mobile,gender,dept,appointmentDate,
            dob,address,visited}=req.body;
        const appointment=new Appointment({firstname,lastname,
            email,dob,address,mobile,gender,dept,status,isSpecial,
            visited,appointmentDate,userid:req.user._id,
        })
        await appointment.save();
        res.send("Appointment registered successfully :) ");
    } catch(error){
        console.log("error :-> ",error )
        res.send("Failed to book appointment :( ")
    }
});

router.post("/special",validateToken,async(req,res)=>{
    try{
        console.log("special called....")
        console.log(req.body);
        const status="Pending";
        const isSpecial=true;
        const{firstname,email,appointedTo,
            mobile,dept,appointmentDate,problem,
            appointmentTime}=req.body;
        const user=await User.findOne({_id:req.user._id});
        const {lastname,dob,address,gender}=user;
        const appointment=new Appointment({firstname,lastname,
            email,dob,problem,mobile,gender,appointmentTime,
            appointmentDate,userid:req.user._id,status,
            appointedTo,isSpecial,dept,address
        });
        await appointment.save();
        res.send("Appointment registered successfully :) ");
    } catch(error){
        console.log("error :-> ",error )
        res.send("Failed to book appointment :( ")
    }
});
router.post("/check",validateToken,async(req,res)=>{
    try{
        const id=req.user._id;
        const {appointedTo}=req.body;
        console.log(id);
        console.log(appointedTo);
        const isBooked=await Appointment.find({userid:id,appointedTo});
        console.log(isBooked);
        if(!isBooked) 
            return res.send([]);
        return res.send(isBooked);
    } catch(error){
        return res.send("NO bookings");
    }
});
router.post("/getMyAppointments",validateToken,async(req,res)=>{
    try{
        const id=req.user._id;
        const {appointedTo}=req.body;
        console.log(id);
        const isBooked=await Appointment.find({userid:id});
        if(!isBooked) 
            return res.send([]);
        return res.send(isBooked);
    }catch(err){
        console.log("error->",err);
        return res.status(400).send("Failed to fetch data!");
    }
});
router.post("/getDoctorAppointments",validateToken,async(req,res)=>{
    try{
        const id=req.user._id;
        console.log(id);
        const isBooked=await Appointment.find({appointedTo:id});
        if(!isBooked) 
            return res.send([]);
        return res.send(isBooked);
    }catch(err){
        console.log("error->",err);
        return res.status(400).send("Failed to fetch data!");
    }
}); 
router.put("/update",async(req,res)=>{
    try{
        // console.log(req.body.id,req.body.status);
        console.log(req.body.appointmentDate,req.body.appointmentTime);
        const id=req.body.id;
        const {status,appointmentDate,appointmentTime}=req.body;
        const updated=await Appointment.findOneAndUpdate({_id:id},{
            appointmentDate,appointmentTime,status
        });
        // console.log(updated);
        res.send("Updated successfully :) ");
    } catch(error){
        console.log("error-> ",error);
        res.status(400).send("Server failed :( ");
    }
});

module.exports=router;