const mongoose=require("mongoose");
const express=require('express');
const app=express();
app.use(express.json());
const cors=require("cors");


mongoose.connect("mongodb://localhost:27017/Hospital")
    .then(()=>console.log("database connected successfully..."))
    .catch(()=>console.log("database not connected..."));

//imports...
const authRouter=require('./Routes/auth.route');
const messageRouter=require('./Routes/message.route');

//api calls..
app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);
app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(4000,()=>{
    console.log("server running at port 4000...");
});