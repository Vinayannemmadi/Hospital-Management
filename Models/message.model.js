const mongoose=require('mongoose');


const Message=mongoose.model('messages',new mongoose.Schema({
    from:{type:mongoose.Types.ObjectId},
    to:{type:mongoose.Types.ObjectId},
    text:{type:String},
    time:{type:Date,default:Date.now},
    email:{type:String},
    firstname:String,
    lastname:String,
    mobile:Number,
}))

module.exports=Message;