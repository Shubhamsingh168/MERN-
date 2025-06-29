import React, { useContext, useState } from "react";
import "../styles/Auth.css";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";

const Auth = () => {
  const {isAuthenticated} = useContext(Context);
  const [islogin , setlogin] = useState(true);
  if(isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }
  return <>
  <div className="auth-page">
    <div className="auth-container">
      <div className="auth-toggle">
        <button className={`toggle-btn ${islogin ? "active":""}`} onClick={()=>{setlogin(true)}}>login</button>
        <button className={`toggle-btn ${!islogin ? "active":""}`} onClick={()=>{setlogin(false)}}>Register</button>
      </div>
      {islogin ? <Login/> : <Register/>}
    </div>
  </div>

   </>;
}

export default Auth;
