import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Department from "./Pages/Department";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import DoctorRegister from "./Pages/DoctorRegister";
import DoctorDetails from "./Pages/DoctorDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
// import { Context } from "./main";
const App = () => {
  // const { isAuthenticated, setIsAuthenticated, setUser } =
  //   useContext(Context);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/department/:id" element={<Department />} />
          <Route path="/doctorregister" element={<DoctorRegister />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
