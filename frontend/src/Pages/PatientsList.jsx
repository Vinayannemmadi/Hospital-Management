import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/doctors/patients');
        console.log(response.data);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients data:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div style={{ display: 'flex',
    justifyContent: 'center', alignItems: 'center', 
    flexDirection: 'column',marginLeft:40,marginRight:40,
    marginTop:130,minHeight:"60vh" }}>
      <h1>Patients List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Delete Acc</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.firstname} {patient.lastname}</td>
              <td>{patient.gender}</td>
              <td>{patient.email}</td>
              <td>
                <button style={{backgroundColor: "#FF5A5A", color: "black", width: 80, height: 30, borderRadius: 7}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsList;
