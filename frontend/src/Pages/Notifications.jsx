import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

import Cookies from 'universal-cookie';
const Notifications = () => {
    const [notifications,setNotifications]=useState([]);
    const [messages,setMessages]=useState([]);
    const [appointments,setAppointments]=useState([]);
    const cookies=new Cookies();
    const token=cookies.get("jwttoken");
    const isDoctor=cookies.get("isdoctor");
    const api=(isDoctor?"getDoctorAppointments":"getMyAppointments");
    useEffect(()=>{
        async function getMessages(){
            try{
                var {data}=await axios.post("http://localhost:4000/api/message/getMyMessages",
                {token});
                // console.log(data);
                setMessages(data);
                data=await axios.post(`http://localhost:4000/api/appointment/${api}`,
                {token});
                console.log(data.data);
                setAppointments(data.data);
                data=await axios.post("http://localhost:4000/api/reply/user",{token});
                setNotifications(data.data);
                console.log(data.data);

            }catch(error){
                console.log(error);
            }
        }
        getMessages();
        

    },[])
    const handleDelete=async(id)=>{
        try{
            const filterMessages = messages.filter((m) => {
                return m._id !== id;
              });
              setMessages(filterMessages);
            const {data}=await axios.put("http://localhost:4000/api/message/deleteMyMessage",{token,id});
            console.log(data);
            toast.success("Message has been deleted successfully :)");
        }catch(error){
            console.log(error);
            toast.error("Failed to delete message :(");
        }
        // navigator("/notifications");
    }
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      const handleStatusChange = (id, newStatus) => {
        setAppointments((prevList) =>
          prevList.map((appointment) =>
            appointment._id === id ? { ...appointment, status: newStatus } : appointment
          )
        );
      };
      const handleDateChange = (id, newDate) => {
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment._id === id ? { ...appointment, 
              appointmentDate: newDate } : appointment
          )
        );
      };
      const handleTimeChange = (id, newTime) => {
        // console.log(id,newTime);
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment._id === id ? { ...appointment, 
              appointmentTime: newTime } : appointment
          )
        );
      };
      const handleUpdate=(id,index)=>{
          const appoint=appointments[index];
          // console.log(appoint);
          try{
              const data=axios.put("http://localhost:4000/api/appointment/update",
                  {token,id,appoint,appointmentDate:appoint.appointmentDate,
                    status:appoint.status,appointmentTime:appoint.appointmentTime});
              console.log(data);
              toast.success("Appointment has been updated successfully :)");
              // handleStatusChange(id, "accepted");
          }catch(err){  
            console.log(err);
          }
      }
    return (
    <div className='notification-card'>
        {notifications.length!==0&& 
        <div className="notifications-container">
        <h2>Notifications</h2>
        <ul className="notifications-list">
            {notifications.map((notification, index) => (
                
            <li key={index} className="notification-item">
                <p style={{paddingLeft:10,marginTop:10,textDecoration:"underline"}}>{notification.name} replied to you message:</p>
                <div className="notification-content">
                    <span className="notification-text">{notification.text}</span>
                    <p className="notification-time">{formatDate(notification.time)}</p>
                </div>
            </li>
            ))}
        </ul>
        </div>}
        <div className='notifications-container'>
            <h1>Your Messages</h1>
            <ul className="notifications-list">
                {messages.map((notification, index) => (
                <li key={index} className="notification-item">
                    <div className="notification-content">
                    <span className="notification-text">{notification.text}</span>
                    <button onClick={()=>handleDelete(notification._id)} style={{background:"none",
                        border:"none",marginLeft:20,cursor:'pointer',
                    }} ><MdDelete size={26}/></button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        {!isDoctor? <div className='notifications-container'>
            <h1 style={{marginBottom:10}}>Your Appointments</h1>
            <ul className="notifications-list">
                {appointments.map((app,index)=>(
                    <li key={index} className="notification-item">
                        <div className="notification-content">
                        <span className="notification-text">Appointment on: {formatDate(app.appointmentDate)}</span>
                        {app.status=="Pending"? <button style={{background:"none",border:"none",
                        fontSize:20,marginLeft:20,cursor:'pointer',color:"orange"}}>{app.status}</button>
                        :app.status=="Accepted"? <button style={{background:"none",border:"none",
                        fontSize:20,marginLeft:20,cursor:'pointer',color:"green"
                    }} >{app.status}</button>: <button style={{background:"none",border:"none",
                        fontSize:20,marginLeft:20,cursor:'pointer',color:"red"
                    }} >{app.status}</button>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>:
        <div className="notifications-container">
          <h1 style={{marginBottom:10}}>Appointments</h1>
        {appointments.map((appointment,index) => (
          <div key={appointment._id} className="appointment-card">
            <p><strong>Name:</strong> {appointment.firstname}</p>
            <p><strong>Gender:</strong> {appointment.gender}</p>
            <p>
              <strong>Appointment Date:</strong> 
              <input 
                style={{width:150,height:35,paddingBottom:20,paddingLeft:10,marginLeft:20}}
                type="date" 
                value={appointment.appointmentDate.split('T')[0]} 
                onChange={(e) => handleDateChange(appointment._id, e.target.value)} 
              />
            </p>
            <p>
              <strong>Appointment Time:</strong> 
              <input 
              style={{width:150,height:35,paddingBottom:20,paddingLeft:10,marginLeft:20}}
                type="time" 
                value={appointment.appointmentTime} 
                onChange={(e) => handleTimeChange(appointment._id, e.target.value)} 
              />
            </p>
            <p>
              <strong>Status:</strong> 
              <select 
              style={{width:150,height:35,paddingBottom:0,fontSize:18,marginLeft:20}}
                value={appointment.status} 
                onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </p>
            <button style={{width:150,height:40,paddingBottom:"20",
              borderRadius:10,marginTop:20
            }} className='messageForm-replyBtn'      
            onClick={() => handleUpdate(appointment._id,index)}     
            >Send response</button>
          </div>
        ))}
      </div>
       }
    </div>
  );
};

export default Notifications;
