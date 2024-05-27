const mongoose=require('mongoose');
const Message=require('../Models/message.model');
const Doctor=mongoose.model('doctors',new mongoose.Schema({
    name:String,
    email:{type:String,unique},
    mobile:Number,
    rating:Number,
    patients:[String],
    messages:{type:Message},
    department:[String]
}));

module.exports=Doctor;