import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const DoctorRegister = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const cookies=new Cookies();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword,setCPassword]=useState("");
  const navigateTo = useNavigate();
  const [dept,setDept]=useState("");
  const [address,setAddress]=useState("");
  const [hospital,setHospital]=useState("");
  const [experience,setExperience]=useState("");
  const [error,setError]=useState("");
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
     let data = await axios.post(
          "http://localhost:4000/api/auth/signup",
          { firstname, lastname, email, mobile:phone, dob,
             gender, password ,isdoctor:true,role:"doctor",dept,
            address,hospital,experience
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(data);
        
        toast.success(data.message);
        navigateTo("/");
        
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up as Doctor</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleRegistration}>
          {error && <div><p style={{color:"red"}}>{error}</p></div>}
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required={true}
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
             required={true}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              required={true}
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <select  required={true} value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type={"date"}
              required={true}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select  required={true} value={dept} onChange={(e) => setDept(e.target.value)}>
              <option value="">Select Department</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Oncology">Oncology</option>
              <option value="Radiology">Radiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="ENT">ENT</option>
            </select>
            <input
              type="textarea"
              required={true}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              required={true}
              placeholder="Hospital Name"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
            <input
              type="text"
              placeholder="Year of experience"
              value={experience}
              required={true}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              required={true}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Confirm Password"
              value={cpassword}
              required={true}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
          <div><Link to="/register">Register as Patient  </Link></div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
  
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DoctorRegister;
