import React from "react";
import "../styles/Instructor.css";
import instructorImage from "../assets/profile.png";

const Instructor = () => {
  return (
    <div className="instructor-page">
      <div className="instructor-card">
        <div className="instructor-image">
          <img src={instructorImage} alt="Instructor" />
        </div>
        <div className="instructor-info" style={{ alignItems: "center" }}>
          <h1>Shubham Singh</h1>
          <h4>Your Instructor</h4>
          <p>
            Welcome! I'm Shubham Singh, a passionate MERN stack developer dedicated to building scalable
            applications and helping others master web development. Through this platform, you’ll learn
            how to implement full-stack authentication, OTP verification, and more—step by step.
          </p>
          <div className="social-links">
            <a
              href="enter yours"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="enter yours"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/channel/UCbGtkGZ9sDg54PtU3GEDE6wenter yours"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
