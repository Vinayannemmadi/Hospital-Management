// import React from 'react'
import Hero from "../components/Hero";
import {Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdLocationPin } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa";
const Department = () => {
    const {id} = useParams();
    const [doctorsList,setDoctorsList]=useState([]);
    
    useEffect(() => {
      async function getDetails (){
        try{
            const d = await axios.post("http://localhost:4000/api/doctors/dept",{dept:id});
          console.log(d.data);
          setDoctorsList(d.data);
        } catch(error){
          console.log(error.response);
        }
      }
      getDetails();
    },[]);

    const text=`There are ${doctorsList.length*1000+123} doctores available across the India.
    There are a huge number of hospitals available in mega cities like Mumbai, Chennai, Hydrabad etc.. 
    Consult the doctors near by your location.`;
    return (
        <>
        <Hero
          title= {id}
          text={text}
          imageUrl={"/signin.png"}
        />
        <>
        <div className="doctorsCards">
        {doctorsList && doctorsList.map((doct, index) => {
          return (
            <Link to={`/doctor/${doct._id}`} key={index} className="doctCard" 
              style={{textDecoration:"none",color:"black"}} >
              <img src={doct.image} alt="Image" style={{width:"200px",
              height:"200px",backgroundColor:"white" , marginTop:10}}/>
              <div className="depart-name" style={{color:"blue"}}>
                <p>{doct.firstname} {doct.lastname}</p></div>
              <div className="depart-name" 
                style={{margin:"10px",display:"flex", gap:"10px",padding:10}}>
                <p><FaHospitalUser /> {doct.hospital}</p>
                <p><MdLocationPin /> {doct.address}</p>
              </div>
            </Link>
          );
        })}
      </div>
        </>
      {/* <AppointmentForm/> */}
      </>
    )
}

export default Department;