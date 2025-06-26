import React, { useContext } from "react";
import "../styles/Hero.css";
import heroImage from "../assets/img1.png"; // Replace if using a different image
import { Context } from "../main";

const Hero = () => {
  const { user } = useContext(Context);

  return (
    <div className="hero-section">
      <div className="hero-left">
        <h4>Hello, <span>{user ? user.name : "Developer"}</span></h4>
        <h1>Welcome to Our Platform</h1>
        <p>
          Dive into modern web development with hands-on projects and real-world features. 
          Build secure and scalable applications using the MERN stack with integrated OTP 
          and email verification functionality.
        </p>
        <a href="#get-started" className="hero-button">Get Started</a>
      </div>

      <div className="hero-right">
        <img src={heroImage} alt="Hero" className="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
