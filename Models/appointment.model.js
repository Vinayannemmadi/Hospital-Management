const mongoose=require('mongoose');
const User=require('./user.model');
const Doctor=require("./doctors.model");

 const Appointment=mongoose.model('Appointments',new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    email:{type:String,},
    firstname:{type:String},
    lastname: {type:String},
    mobile:   {type:String},
    dob:      {type:Date},
    gender:   {type:String},
    appointmentDate:{type:Date},
    appointmentTime:{type:String},
    dept:{type:String},
    address:String,
    appointedTo:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
    problem:String,
    visited:Boolean,
    status:String,
    isSpecial:Boolean
 }));

 module.exports=Appointment;