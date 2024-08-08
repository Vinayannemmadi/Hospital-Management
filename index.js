const mongoose=require("mongoose");
const express=require('express');
const app=express();
app.use(express.json());
const cors=require("cors");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
mongoose.connect("mongodb://localhost:27017/Hospital")
    .then(()=>console.log("database connected successfully..."))
    .catch(()=>console.log("database not connected..."));

//imports...
const authRouter=require('./Routes/auth.route');
const messageRouter=require('./Routes/message.route');
const doctorsRouter=require("./Routes/doctors.route");
const appointmentRouter=require("./Routes/appointment.route");
const replyRouter=require("./Routes/reply.route");
//api calls..
app.use('/api/auth',authRouter);
app.use('/api/message',messageRouter);
app.use('/api/doctors',doctorsRouter);
app.use('/api/appointment',appointmentRouter);
app.use('/api/reply',replyRouter);
app.get("/",(req,res)=>{
    res.send("hello");
});
app.post("api/admin",)

app.listen(4000,()=>{
    console.log("server running at port 4000...");
});