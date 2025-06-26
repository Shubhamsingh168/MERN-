import React from "react";
import "../styles/Technologies.css";

const techData = [
  {
    name: "React",
    image: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
    description:
      "React is a powerful JavaScript library for building dynamic and responsive UIs.",
  },
  {
    name: "Node.js",
    image: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
    description:
      "Node.js is a scalable JavaScript runtime for fast, server-side applications.",
  },
  {
    name: "Express.js",
    image: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
    description:
      "Express.js simplifies building robust APIs with Node.js and minimal setup.",
  },
  {
    name: "MongoDB",
    image: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
    description:
      "MongoDB is a flexible, JSON-based NoSQL database for modern applications.",
  },
];

const Technologies = () => {
  return (
    <section className="technologies-section">
      <h2 className="technologies-title">Our Tech Stack</h2>
      <div className="technologies-container">
        {techData.map((tech, index) => (
          <div className="technology-card" key={index}>
            <img
              src={tech.image}
              alt={tech.name}
              className="technology-image"
            />
            <h3 className="technology-name">{tech.name}</h3>
            <p className="technology-description">{tech.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
