const mongoose=require('mongoose');
const User=require('./user.model');
 const User=mongoose.model('Users',new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    emial:{
        type:String,
        minlength:10,
        unique:true,
        required:true
    },
    firstname:{type:String},
    lastname: {type:String},
    mobile:   {type:String},
    dob:      {type:Date},
    gender:   {type:String},
    nic:      {type:String},
    appointmentdate:{type:Date},
    pediatrics:{type:String},
    address:String,
    visited:Boolean
 }));

 module.exports=User;