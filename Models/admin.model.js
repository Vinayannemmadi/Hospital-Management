const mongoose=require('mongoose');

 const Admin=mongoose.model('Admin',new mongoose.Schema({
    email:{
        type:String,
        minlength:10,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    username:{
        type:String
    }

 }));

 module.exports=Admin;