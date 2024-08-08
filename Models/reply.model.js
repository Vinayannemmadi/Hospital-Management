const mongoose=require('mongoose');


const Reply=mongoose.model('reply',new mongoose.Schema({
    from:{type:mongoose.Types.ObjectId},
    to:{type:mongoose.Types.ObjectId},
    text:{type:String},
    time:{type:Date,default:Date.now},
    email:{type:String},
    name:String,
    mobile:Number,
}))

module.exports=Reply;