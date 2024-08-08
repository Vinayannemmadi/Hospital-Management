const express=require("express");
const router=express.Router();
const dotenv=require("dotenv");
const jwt= require("jsonwebtoken");
const Doctor = require("../Models/doctors.model");
const Reply=require("../Models/reply.model");
dotenv.config();

const validateToken=(req,res,next)=>{
    const {token}=req.body;
    if(!token) return res.status(400).send("Authentication required!");
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err)return res.status(400).send("Invalid Token!");
        req.user=decoded
        next();
    })
}
router.post("/send",validateToken,async(req,res)=>{
    try{
        console.log(req.body);
        const {text,to}=req.body;
        const id=req.user._id;
        const doctor=await Doctor.findOne({_id:id});
        if(!doctor)req.status(400).send("You can't send message to this user!");
        const {firstname,mobile,email}=doctor;
        const from=doctor._id;
        const reply=new Reply({text,email,from,to,name:firstname,mobile});
        await reply.save();
        res.send("Message sent successfully");
    } catch(error){
        console.log(error);
        res.send("Server failed!");
    }
});

router.get("/all", async (req, res) => {
    try {
        const replies = await Reply.find();
        res.json(replies);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server failed!");
    }
});

// Route to get a reply by ID
router.post("/user", validateToken, async (req, res) => {
    try {
        const  id  = req.user._id;
        const reply = await Reply.find({to:id});
        if (reply.length===0) return res.status(400).send("Reply not found!");
        res.send(reply);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server failed!");
    }
});

// Route to get replies from a specific user
router.post("/from", validateToken, async (req, res) => {
    try {

        const  userId  = req.user._id;
        console.log(userId);
        const replies = await Reply.find({ from: userId });
        if (replies.length === 0) return res.status(400).send("No replies found from this user!");
        res.json(replies);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server failed!");
    }
});

module.exports=router;