import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/auth/user"); 
        setIsAuthenticated(true);
        setUser(res.data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false); // Mark loading as done
      }
    };

    getUser();
  }, [setIsAuthenticated, setUser]);

  if (loading) return <div>Loading...</div>; // Optional: Add a spinner here

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/otp-verification/:email/:phone"
            element={<OtpVerification />}
          />
          <Route
            path="/password/forgot"
            element={<ForgotPassword />}
          />
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
        </Routes>
        <ToastContainer theme="colored" />
      </Router>
    </>
  );
};

export default App;
