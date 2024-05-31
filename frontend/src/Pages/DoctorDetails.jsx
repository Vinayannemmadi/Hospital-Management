
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoMdContact } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import Booking from '../components/Booking';
const DoctorDetails = () => {
    const {id}=useParams();
    const [doctor,setDoctor]=useState({});
    useEffect(()=>{
        async function getDetails(){
            try{
                const d = await axios.
                get(`http://localhost:4000/api/doctors/${id}`);
                setDoctor(d.data);
                console.log(d.data);
            } catch(error){
                console.log(error.response);
            }
        }
        getDetails();
    },[])
    return (
        <>
        <h3 style={{marginTop:120,textAlign:"center"}}>
            Meet our doctor : {doctor.firstname} {doctor.lastname}</h3>
        <div className="doctorDetails">
            {/* <h1>{id}</h1> */}
            <img src={doctor.image} alt="doctor"
                style={{height:"350px",width:"300px" ,color:"gray",
                    backgroundColor:"yellowgreen"
                }}/>
            <div>
                <p style={{padding:20}}><IoMdContact /> {doctor.firstname} {doctor.lastname}</p>
                <p style={{padding:20}}><FaPhone /> {doctor.mobile} </p>
                <p style={{padding:20}}><MdEmail /> {doctor.email}</p>
                <p style={{padding:20}}><FaHospitalUser /> {doctor.hospital}</p>
                <p style={{padding:20}}><FaLocationDot /> {doctor.address}</p>
                <p style={{padding:20}}><FaHandshakeAngle/> {doctor.experience} year of experience</p>
            </div>
            
        </div>
        <Booking id={id}/>
        </>
    )
}

export default DoctorDetails;