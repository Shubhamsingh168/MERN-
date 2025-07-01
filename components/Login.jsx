import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context)
  const Navigate = useNavigate();

  const { register, handleSubmit, formState:{error} } = useForm();
  const handleLogin = async (data) => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/login`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    }).then((res) => {
      toast.success("Login successful");
      setIsAuthenticated(true);
      setUser(res.data.user);
      Navigate("/");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  };
  return ( 
  <>
  <form className="auth-form" onSubmit={handleSubmit((data) => handleLogin(data))}>
    <h2>Login</h2>
    <input type="email" placeholder="Email" required {...register("email")}/>
    <input type="password" placeholder="Password" required {...register("password")}/>
    <p className="auth-form-forgot-password">
      <Link to="/password/forgot">Forgot Your Password</Link>
    </p>
    <button type="submit" className="auth-form-btn">Login</button>
  </form>
  </>
  );
};

export default Login;
