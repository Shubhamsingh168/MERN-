import React, { useContext, useState } from "react";
import "../styles/ForgotPassword.css";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/password/forgot",
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forgot-password-page" style={styles.page}>
      <div className="forgot-password-container" style={styles.container}>
        <h2 style={styles.heading}> Forgot Your Password?</h2>
        <p style={styles.subtext}>
          Enter your registered email address and we’ll send you a reset link.
        </p>
        <form onSubmit={handleForgotPassword} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
             Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  container: {
    background: "#ffffff",
    borderRadius: "1rem",
    padding: "2rem 3rem",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#333",
  },
  subtext: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem 1rem",
    backgroundColor: "#2575fc",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default ForgotPassword;
