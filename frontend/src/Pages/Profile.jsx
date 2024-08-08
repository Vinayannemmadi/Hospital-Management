// src/Profile.js

import React, { useEffect, useState } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
// import './Profile.css';
import { IoMdContact } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import axios from 'axios';
import Cookies from 'universal-cookie'; 

const Profile = () => {

    const cookies=new Cookies();
    const token=cookies.get('jwttoken');
    const doctor = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Software engineer with a passion for web development and open source.',
  };
  const [user,setUser]=useState({});
  useEffect(()=>{
        async function getDetails(){
            try{
                const {data}=await 
                    axios.post(`http://localhost:4000/api/auth/getProfile`,{token});
                console.log(data);
                setUser(data);
            } catch (error){
                console.log(error.response);
            }
        }
        getDetails();
  },[]);
  const handleLogout=()=>{
    cookies.remove('jwttoken');
    cookies.remove('isdoctor');
    cookies.remove('isadmin');
    window.location.href="/login";
  }
  return (
    <div className='profileCard'>
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={user.photo?user.photo:doctor.avatar} alt={`Photo`} 
          style={{width:"250px" ,height:"250px",
             }}/>

      </div>
      <div className="profile-details">
        <h1>{user.name}</h1>
        <div>
                <p style={{padding:20}}><IoMdContact /> {user.firstname} {user.lastname}</p>
                <p style={{padding:20}}><FaPhone /> {user.mobile} </p>
                <p style={{padding:20}}><MdEmail /> {user.email}</p>
                {user.isdoctor &&<p style={{padding:20}}><FaHospitalUser /> {user.hospital}</p>}
                {user.isdoctor &&<p style={{padding:20}}><FaLocationDot /> {user.address}</p>}
                {user.isdoctor &&<p style={{padding:20}}><FaHandshakeAngle/> {user.experience} year of experience</p>}
        </div>
        <div className="profile-buttons-container">
          <button className='profileBtn' >Edit Profile</button>
          <button className='profileBtn' onClick={()=>handleLogout()}>Logout</button>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Profile;
