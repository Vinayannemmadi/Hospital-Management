import axios from "axios";
import  { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const cookies=new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
     let {data}= await axios
        .post(
          "http://localhost:4000/api/auth/signin",
          { email, password,  role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        console.log(data);
        cookies.set("jwttoken",data.token);
        cookies.set("isdoctor",data.isdoctor);
        navigateTo('/');
    } catch (error) {
      console.log(error.response.data);
      if(error.response){
        setError(error.response.data);}
      else setError("Unknown error occured. Please try again later");
      toast.error(error.response.data);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          We are happy to welcome you to ZEECAERE family. We make sure that you have  a pleasant experience.  
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)&& setError("")}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value) && setError("")}
          />
          
          {error && <div style={{fontSize:20,color:'red'}}>{error}</div>}
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
