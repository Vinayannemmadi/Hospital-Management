const User=require('../Models/user.model');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const signup=async(req,res,next)=>{

    const {firstname,lastname,mobile,dob,gender,nic,password,email}=req.body;
    if(!firstname || !lastname || !mobile || !dob || !gender || !nic || !password || !email){
        return res.status(400).send("Fill the form correctly..!");
    }
    try{
        const exist=await User.findOne({email:email});
        if(exist)return res.status(400).send("User already exist with this email!");
        const user=new User({firstname,lastname,mobile,dob,gender,nic,password,email});
        const salt=await bcryptjs.genSalt(10);
        const newPassword=await bcryptjs.hash(password,salt);
        user.password=newPassword;
        await user.save();
        res.send("user created successfully");
    } catch(error){
        console.log(error);
        next();
    }
};

const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password) 
        return res.status(400).send("Enter valid Email and Password");
    try{
        const user=await User.findOne({email:email});
        if(!user) return res.status(400).send("User not found!");
        const isValid=await bcryptjs.compare(password,user.password);
        if(!isValid)return  res.status(400).send("Invalid Password");
        const token=jwt.sign({_id:user._id},process.env.SECRET_KEY);
        return res.header('auth-token',token).send(token);

    } catch (error){    
        console.log(error);
        res.status(400).send("Invalid Login!");
    }
}
const validateToken=(req,res,next)=>{
    const {token}=req.body;
    if(!token)return res.status(400).send("Authentication required!");

    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err)return res.status(400).send("Invalid Token!");
        req.user=decoded;
        next();
    });
}
const deleteAcc=async(req,res,next)=>{
    const {token}=req.body;
    console.log(token);
    const error=validateToken(req,res,next);
    if(error){
        res.send(error);
        return ;
    }
    const {_id}=req.user;
    console.log(_id);
    try {
        const user = await User.findOne({_id: _id});
        if (user){
        //    return res.status(400).send("User not found!");
            await User.findOneAndDelete({_id: _id});
            return res.send("User deleted :)");
            return ;
        }
        else{
            return res.send("User not found!")
        }
    } catch (error) {
        // If an error occurs during execution, this block will handle it
        console.error(error); // Log the error for debugging purposes
        // res.status(400).send("Unable to delete Account!");
    }
    
}
module.exports={signin,signup,deleteAcc};