import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated } = useContext(Context);
  const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+91${data.phone}`;
    try {
      const res = await axios.post("https://mern-2z1r.onrender.com/api/v1/register", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Registration successful");
      Navigate(`/otp-verification/${data.email}/${data.phone}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          required
          {...register("name")}
        />

        <input
          type="email"
          placeholder="Email"
          required
          {...register("email")}
        />

        {/* Phone Input with +91 inside */}
        <div className="phone-input-wrapper" style={{ position: "relative", width: "100%" }}>
          <span
            className="phone-prefix"
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#555",
              fontSize: "14px",
              pointerEvents: "none",
            }}
          >
            +91
          </span>
          <input
            type="tel"
            placeholder="1234567890"
            maxLength={10}
            required
            {...register("phone")}
            className="phone-input"
            style={{ paddingLeft: "40px", width: "100%" }}
          />
        </div>

        <input
          type="password"
          placeholder="Password"
          required
          {...register("password")}
        />
        <div
          className="verification-method"
          style={{ width: "100%", textAlign: "left" }}
        >
          <p style={{ marginBottom: "10px" }}>Select Verification Method</p>
          <div
            className="wrapper"
            style={{
              display: "flex",
              gap: "50px",
              alignItems: "center"
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="radio"
                name="verificationMethod"
                value="email"
                {...register("verificationMethod", { required: true })}
              />
              Email
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="radio"
                name="verificationMethod"
                value="phone"
                {...register("verificationMethod", { required: true })}
              />
              Phone
            </label>
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
