import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/doctors/all');
        console.log(response.data);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors data:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <div style={{ display: 'flex',
        justifyContent: 'center', alignItems: 'center', 
        flexDirection: 'column',marginLeft:40,marginRight:40,
        marginTop:130,minHeight:"60vh" }}>
      <h1>Doctors List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Area</th>
            <th>Delete Acc</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.firstname} {doctor.lastname}</td>
              <td>{doctor.dept}</td>
              <td>{doctor.address}</td>
              <td><button style={{backgroundColor:"#FF5A5A",
                color:"black",width:80,height:30,borderRadius:7}}>
                    Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsList;
