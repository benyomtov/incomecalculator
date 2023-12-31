import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ handleNavbarClick }) => {
  return (
    <div className="navbar container-fluid">
      <h1 className="container-fluid justify-content-center">CCAP Income Calculator</h1>
      <div className="navbar__content container-fluid justify-content-start">
        <h2 className="col p-2 text-center"> Select a calculator</h2>
        <Link to="/" 
        onClick={() => handleNavbarClick("primaryIncome")}
        className="col p-2 m-2"
        >
          Primary Income
        </Link>
        <Link
          to="/csquestion"
          onClick={() => handleNavbarClick("childSupport")}
          className="col p-2 m-2"
        >
          Child Support
        </Link>
        <Link
          to="/ssdquestion"
          onClick={() => handleNavbarClick("ssdQuestion")}
            className="col p-2 m-2"
        >
          S.S.D.
        </Link>
        <Link to="/other" onClick={() => handleNavbarClick("other")}
        className="col"
        >
          Other
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
