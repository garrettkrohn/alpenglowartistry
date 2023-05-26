import React from "react";
import "./Commissions.scss";
import Contact from "../Contact/Contact";

const Commissions = () => {
  return (
    <div className="commissions-container">
      <div className="commissions-header">
        Commissions may be considered. Fill out the form below with a
        description of the project with size, a photo for reference, and any
        other additional details.
      </div>
      <Contact />
    </div>
  );
};

export default Commissions;
