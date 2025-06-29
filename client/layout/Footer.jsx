import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

// Social icons
import fb from "../assets/fb.png";
import yt from "../assets/yt.png";
import git from "../assets/git.png";
import linkedin from "../assets/linkedin.png";
import shield from "../assets/shield.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Updated Left Corner */}
        <div className="footer-logo animated-logo">
          <div className="logo-heading">
            <img
              src={shield}
              alt="Secure"
              className="logo-icon"
            />
            <h2>Secure MERN Auth</h2>
          </div>
          <p>
            Empower your apps with seamless authentication and modern MERN
            security best practices.
          </p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>Follow Me</h3>
          <div className="social-icons">
            <Link to="YOUR_FACEBOOK_URL" target="_blank" className="social-link">
              <img src={fb} alt="Facebook" />
            </Link>
            <Link to="YOUR_YOUTUBE_URL" target="_blank" className="social-link">
              <img src={yt} alt="YouTube" />
            </Link>
            <Link to="YOUR_LINKEDIN_URL" target="_blank" className="social-link">
              <img src={linkedin} alt="LinkedIn" />
            </Link>
            <Link to="YOUR_GITHUB_URL" target="_blank" className="social-link">
              <img src={git} alt="GitHub" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="footer-tech">
        <h3>Tech Stack / Documentation</h3>
        <div className="tech-icons">
          <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
          </a>
          <a href="https://nodejs.org/en/docs" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
          </a>
          <a href="https://expressjs.com/en/starter/installing.html" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" />
          </a>
          <a href="https://www.mongodb.com/docs/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>&copy; 2024 MERN Authentication. All Rights Reserved.</p>
        <p>
          Designed by <span className="designer-name">Shubham Singh</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
