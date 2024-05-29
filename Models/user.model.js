const mongoose=require('mongoose');

 const User=mongoose.model('Users',new mongoose.Schema({
    email:{
        type:String,
        minlength:10,
        unique:true,
        required:true
    },
    firstname:{type:String},
    lastname: {type:String},
    mobile:   {type:Number},
    password: {type:String},
    dob:      {type:String},
    gender:   {type:String},    
 }));

 module.exports=User;
