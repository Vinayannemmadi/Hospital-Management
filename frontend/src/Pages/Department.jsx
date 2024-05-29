// import React from 'react'
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import {useParams} from "react-router-dom";
const Department = () => {
    const {id} = useParams();
    const department = `Department ${id}`
    console.log(department);
    const text=`There are {count} of doctores available across the India.
    There are a huge number of hospitals available in mega cities like Mumbai, Chennai, Hydrabad etc.. 
    Consult the doctors near by your location.`;
    return (
        <>
        <Hero
          title= {id}
          text={text}
          imageUrl={"/signin.png"}
        />
        <AppointmentForm/>
      </>
    )
}

export default Department;