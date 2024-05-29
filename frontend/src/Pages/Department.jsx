// import React from 'react'
import Hero from "../components/Hero";
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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

    const text=`There are ${doctorsList.length} doctores available across the India.
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
        {}
        </>
      {/* <AppointmentForm/> */}
      </>
    )
}

export default Department;