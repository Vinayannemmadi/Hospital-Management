import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const cookies=new Cookies();
  const token=cookies.get("jwttoken");
  const departmentsArray = [   
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  //useEffect-->
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      console.log(data.doctors);
    };
    // fetchDoctors();
  }, []);
  //Submit form-->
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/appointment/general",
        {
          firstName,
          lastName,
          token,
          email,
          mobile:phone,
          isGeneral:true,
          dob,
          gender,
          appointmentDate: appointmentDate,
          dept:department,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data);
      toast.success("Appoitment registered successfully :)");
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2 style={{textAlign:"center"}}>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              required={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              required={true}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>      
            <select style={{fontSize:17,color:"gray",paddingLeft:"8px"}}
             required={true} 
              value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              style={{fontSize:17,color:"gray",paddingLeft:"8px"}} 
              value={department}
              placeholder="Department"
              required={true}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            > 
              <option>Department</option>
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              type="date"
              required={true}
              style={{fontSize:17,color:"gray",paddingLeft:"8px"}} 
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
             <input
              type="date"
              required={true}
              style={{fontSize:17,color:"gray",paddingLeft:"8px"}} 
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <textarea
            rows="3"
            required={true}
            style={{fontSize:18,color:"gray",paddingLeft:"8px"}} 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button type="submit" style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
