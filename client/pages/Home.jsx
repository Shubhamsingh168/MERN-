import React from "react";
import Hero from "../components/Hero";
import Instructor from "../components/Instructor";
import Technologies from "../components/Technologies";
import "../styles/Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = React.useContext(Context);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      setIsAuthenticated(false);
      setUser(null);
      toast.success(response.data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <section className="home">
      <Hero />
      <div className="home__content">
        <h1 className="home__title">Welcome to Our Platform</h1>
        <p className="home__description">
          Explore our resources and learn full-stack web development the modern way.
        </p>
      </div>
      <Instructor />
      <Technologies />
      <Footer />
      <button onClick={logout}>Logout</button>
    </section>
  );
};

export default Home;
