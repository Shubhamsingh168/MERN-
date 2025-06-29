import React, { useContext, useState } from "react";
import "../styles/ResetPassword.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const ResetPassword = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Password reset successful");
      setIsAuthenticated(true);
      setUser(data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  if (isAuthenticated && !token) {
    return <Navigate to="/" />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}> Reset Your Password</h2>
        <p style={styles.subtitle}>
          Enter your new password below and confirm it.
        </p>
        <form className="reset-password-form" onSubmit={handleResetPassword} style={styles.form}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button className="reset-btn" type="submit" style={styles.button}>
             Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2.5rem 2rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "0.5rem",
    fontSize: "1.75rem",
    color: "#333",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#6c63ff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default ResetPassword;
