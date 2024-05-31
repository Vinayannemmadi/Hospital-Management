const mongoose=require('mongoose');
const Message=require('../Models/message.model');
const Doctor=mongoose.model('Doctors',new mongoose.Schema({
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
    dept:     {type:String}, 
    address:  {type:String},
    hospital: {type:String},
    experience:{type:Number},
 }));

module.exports=Doctor;