import React from "react";
import "./style.css";

export const Welcome = () => {
  return (
    <div className="welcome">
      <div className="text-wrapper">Hello Sarah</div>
      <p className="div">Welcome to your digital knowledge hub</p>
      <img className="ellipse" alt="spinner" src="../src/assets/spinner.gif" />
    </div>
  );
};

export default Welcome;