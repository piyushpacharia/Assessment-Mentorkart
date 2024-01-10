import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import ContactHistory from "./components/HistoryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FormContext from "./FormContext";
import { useEffect, useState } from "react";
export default function App() {
  const BASE_URL = "http://localhost:8000";
  const [user, setUser] = useState(null);
  const [mailDetails, setMailDetails] = useState([]);
  const navigate = useNavigate();

  const Login = (email, password) => {
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message );
        } else {
          setUser(data);
          toast.success("Logged in successfully");
          localStorage.setItem("contactformUsers", JSON.stringify(data));
          navigate("/Home");
        }
      });
  };

  const SignUpUser = (name ,email ,password) =>{
    fetch(`${BASE_URL}/auth/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
    
      },
      body:JSON.stringify({name,email,password})
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success == false){
        toast.error(data.message)
      }else{
       toast.success(data.message)
       navigate("/")
      }
    })
  }

  const fetchMails = () =>{
    fetch(`${BASE_URL}/form-data/fetch-mails`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
         Authorization:user.token,
      },
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success == false){
        console.log("mails not found " + data.message)
      }else{
        setMailDetails(data.mailDetails)
      }
    })
  }

  const sendMail = (receiverEmail, mailSubject ,mailMessage)=>{
    fetch(`${BASE_URL}/form-data/send-mail`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:user.token,
      },
      body:JSON.stringify({ receiverEmail, mailSubject, mailMessage })
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success ==false){
        toast.error("error while send mail " + data.message)
       
      }else{
       toast.success("Mail Sent Successfully")
       fetchMails();
      }
    })
  }
  useEffect(()=>{
    if(localStorage.getItem("contactformUsers")){
      setUser(JSON.parse(localStorage.getItem("contactformUsers")));
      navigate("/Home")
    }
  },[])

  const Logout =()=>{
    setUser(null)
    localStorage.clear("contactformUsers")
    navigate("/")
  }
  return (
    <div>
      <FormContext.Provider value={{ Login,SignUpUser , user , Logout ,fetchMails ,mailDetails ,sendMail}}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Contact-History" element={<ContactHistory />} />
        </Routes>
      </FormContext.Provider>
    </div>
  );
}
