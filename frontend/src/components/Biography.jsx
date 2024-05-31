import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          ZEE CARE is a pioneering organization dedicated to revolutionizing the healthcare industry through innovative hospital management solutions. Established with a vision to enhance the efficiency and effectiveness of healthcare facilities, ZEE CARE specializes in providing cutting-edge Hospital Management Systems (HMS) tailored to meet the dynamic needs of hospitals, clinics, and other healthcare institutions.
          </p>
          <p>We are all in 2024!</p>
          <br/>
          <h4 style={{color:"#363636"}}>
            Our Mission:
          </h4>
          <p>
            At ZEE CARE, our mission is to empower healthcare providers with the tools and technology necessary to deliver superior patient care. We strive to streamline hospital operations, reduce administrative burdens, and facilitate seamless communication across departments, ensuring that healthcare professionals can focus on what they do best—caring for patients.
          </p>
          
        </div>
      </div>
    </>
  );
};

export default Biography;
