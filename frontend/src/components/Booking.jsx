import { useParams } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import Cookies from "universal-cookie";
const Booking =()=>{
    const cookies=new Cookies();
    const token=cookies.get("jwttoken");
    console.log(token);
    const {id}=useParams();
    console.log(id);
    const [firstname,setFirstName]=useState("");
    const [email,setEmail]=useState("");
    const [mobile,setMobile]=useState("");
    const [message,setMessage]=useState("");
    const [date,setDate]=useState("");
    const [time,setTime]=useState();
    const handleMessage=async (e)=>{
        e.preventdefault();
        try{
            const {data}=await axios.
            post("http://localhost/4000/api/booking",
            {id,token,firstname,email,mobile,message,date,time});
            console.log(data);
            alert(data.message);
        } catch(error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleMessage}>
            <div>
                <input
                type="text"
                placeholder="First Name"
                required={true}
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <input
                type="text"
                placeholder="Email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="number"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                />
                <input
                type="date"
                placeholder="Slot date"
                value={date}
                required={true}
                onChange={(e) => setDate(e.target.value)}
                />
                <input
                type="time"
                placeholder="Slot date"
                required={true}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <textarea
                rows={7}
                placeholder="Problem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button type="submit">Send</button>
            </div>
       </form>
    )
 }
 export default Booking;