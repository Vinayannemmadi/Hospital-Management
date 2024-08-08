import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { toast } from "react-toastify"; 
const Booking = ({ dept }) => {
    const cookies = new Cookies();
    const token = cookies.get("jwttoken");
    const { id } = useParams();

    const [firstname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleMessage = async (e) => {
        e.preventDefault(); // Corrected method name
        console.log("submitted..");
        try {
            const {data} = await axios.post("http://localhost:4000/api/appointment/special", {
                appointedTo:id,
                email,
                mobile,
                firstname,
                problem:message,
                dept,
                appointmentDate: date,
                appointmentTime: time,
                token
                // Added message to the data
            });
            console.log(data);
            setDate("");
            setEmail("");
            setFirstName("");
            setMessage("");
            setMobile("");
            setTime("");
            toast.success(data)
            // You can add feedback to the user here if needed
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
            // Handle the error and give feedback to the user if needed
        }
    };

    return (
        <form onSubmit={handleMessage}>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    required
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="firstname" // Added name attribute
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email" // Added name attribute
                />
                <input
                    type="number"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    name="mobile" // Added name attribute
                />
                <input
                    type="date"
                    placeholder="Slot date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    name="date" // Added name attribute
                />
                <input
                    type="time"
                    placeholder="Slot time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    name="time" // Added name attribute
                />
            </div>
            <textarea
                rows={7}
                placeholder="Problem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message" // Added name attribute
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default Booking;
