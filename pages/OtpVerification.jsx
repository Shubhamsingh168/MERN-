import React, { useContext, useState } from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { phone, email } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const data = {
      phone: phone,
      email: email,
      otp: enteredOtp,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/verify-otp`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("OTP verified successfully");
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="otp-verification-page">
      <div className="otp-container">
        <h2>OTP Verification</h2>
        <p className="otp-description">
          Please enter the OTP sent to your {phone ? "phone" : "email"}.
        </p>
        <form className="otp-form" onSubmit={handleOtpVerification}>
          <div className="otp-inputs-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" className="verify-btn">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
