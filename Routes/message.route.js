const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();
const dotenv=require('dotenv');
dotenv.config();
const User=require('../Models/user.model');
const Message = require('../Models/message.model');
const Admin = require('../Models/admin.model');


const validateToken=(req,res,next)=>{
    const {token}=req.body;
    if(!token) return res.status(400).send("Authentication required!");
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err)return res.status(400).send("Invalid Token!");
        req.user=decoded
        next();
    })
}
router.post('/send',validateToken,async(req,res)=>{
    if(!req.body)return res.status(400).send("Please fill all fields");
    const {email,name,mobile,text}=req.body;
    const id=req.user._id;
    console.log(id);
    try{
        const admin=await Admin.findOne({email:"zeecare@gmail.com"})
        const to=admin._id;
        const user=await User.findOne({_id:id});
        if(!user)res.status(400).send("You are not authenticated to send message!");
        const message=new Message({from:id,to,email,name,mobile,text});
        await message.save();
        return res.send("Message has been sent.");
    } catch(error){
        console.log(error);
       return  res.status(400).send("Can't send Message this time ':)");
    }
});
router.post("/getMyMessages",validateToken,async(req,res)=>{
    try{
        const {_id}=req.user;
        const messages=await Message.find({from:_id});
        res.send(messages);
    } catch(error){
        console.log(error);
        res.status(400).send("Server failed :(");
    }
});
router.put("/deleteMyMessage",async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id)return res.status(400).send("This message already deleted!");
        const deleted=await Message.findByIdAndDelete(id);
        console.log(id);
        return res.send("Message deleted ");
    } catch(error){
        return res.status(400).send("Failed to delete message!");
    }
});
router.get("/getAllMessages",async(req,res)=>{
    try{
        console.log("All messages..")
        const messages=await Message.find();
        res.send(messages);
    } catch (error){
        res.status(400).send("Server error!");
    }
});
router.get('/user',validateToken,async(req,res)=>{
    const id=req.user._id;
    if(!id) return res.status.id("No message found!");
    try{
        const message=await Message.find({from:id}).select({_id:1,text:1});
        if(!message) return res.status(400).send("This message has already deleted!");
        res.send(message);
    } catch(error){
        res.status(400).send("Faild to delete message..");
    }
});

router.delete('/',async(req,res)=>{

    try{
        
    } catch(error){

    }
})
module.exports=router;
