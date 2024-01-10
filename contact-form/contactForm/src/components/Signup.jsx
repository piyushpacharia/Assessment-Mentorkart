
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FormContext from '../FormContext';

export default function Signup() {
  const {SignUpUser} = useContext(FormContext)
  const [name , setName]=useState("")
  const [email , setEmail]=useState("")
  const [password , SetPassword]=useState("")
  return (
    <>
    <div className="nav">
        
    <h1 className="m-3" style={{fontFamily: 'Rubik Lines',fontSize:"xx-large"}}>CONTACT LINK</h1>
</div>
    <div className="form-main">
      <div className="SignUp-form">
        <form>
          <h1 className="text-start">SignUp</h1>
          <div className="form-group">
            <input
              type="text"
              className="form-control mt-3"
              id="exampleFormControlInput1"
              placeholder="Enter Your Name"
              onChange={(e)=>setName(e.currentTarget.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control mt-3"
              id="exampleFormControlInput1"
              placeholder="Enter Your Email"
              onChange={(e)=>setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control mt-3"
              id="exampleFormControlInput1"
              placeholder="Enter Your Password"
              onChange={(e)=>SetPassword(e.currentTarget.value)}
            />
          </div>
<div>
    <button className="btn btn-primary form-btn" onClick={(e)=>{e.preventDefault();SignUpUser(name,email,password)}}>SignUp</button>
</div>
         <div className='mt-2'>
            Already Have An Account ? <Link to="/"><span className="text-danger ">Login</span> </Link>
         </div>
        </form>
      </div>
    </div>
    </>
  );
}

