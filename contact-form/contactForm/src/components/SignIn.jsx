import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormContext from "../FormContext";

export default function SignIn() {
    const {Login} = useContext(FormContext)
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
  return (
    <>
    <div className="nav">
        
    <h1 className="m-3" style={{fontFamily: 'Rubik Lines',fontSize:"xx-large"}}>CONTACT LINK</h1>
</div>
    <div className="form-main ">
      <div className="login-form ">
        <form>
          <h1 className="text-start mt-3">SignIn</h1>
          <div className="form-group">
            <input
              type="email"
              className="form-control mt-3"
              
              placeholder="Enter Your Email"
              onChange={(e)=>setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control mt-3"
              
              placeholder="Enter Your Password"
              onChange={(e)=>setPassword(e.currentTarget.value)}
            />
          </div>
<div>
    <button className="btn btn-primary form-btn" onClick={(e)=>{e.preventDefault();Login(email,password)}}>SignIn</button>
</div>
         <div className="mt-2"> 
            Don't Have An Account ?<Link to="/SignUp"> <span className="text-danger">SignUp</span> </Link>
         </div>
        </form>
      </div>
    </div>
    </>
  );
}
