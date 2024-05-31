import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
// import axios from "axios";
// import { toast } from "react-toastify";
import { Context } from "../main";
import Cookies from "universal-cookie";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const cookies=new Cookies();
  const handleLogout = async () => {
    try {
      cookies.remove("jwttoken");
      cookies.remove("isdoctor");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(()=>{
    async function checkAuth(){
        if(cookies.get("jwttoken")){
            setIsAuthenticated(true);
        }
    }
    checkAuth();
  },[])
  const navigateTo = useNavigate();

  const goToLogin = () => {
    setShow(!show);
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="logo" className="logo-img" />
          </Link>
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          {isAuthenticated && (
            <Link to={"/notifications"} onClick={() => setShow(!show)}>Notifiations</Link>)
          }
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={ handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={ goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
