import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ handleNavbarClick }) => {
  return (
    <div className="navbar container-fluid">
      <h1 className="container-fluid justify-content-center fs-1 fw-bold border rounded-pill border-4 border-primary-subtle">CCAP Income Calculator</h1>
      <div className="navbar__content container-fluid justify-content-center">
        <h2 className="col-2 p-2 text-center fw-bold me-3"> Select a calculator:</h2>
        <Link to="/" 
        onClick={() => handleNavbarClick("primaryIncome")}
        className="col-2 p-2 m-2 btn btn-primary border border-4 border-primary-subtle"
        >
          Primary Income
        </Link>
        <Link
          to="/csquestion"
          onClick={() => handleNavbarClick("childSupport")}
          className="col-2 p-2 m-2 btn btn-primary border border-4 border-primary-subtle"
        >
          Child Support
        </Link>
        <Link
          to="/ssdquestion"
          onClick={() => handleNavbarClick("ssdQuestion")}
            className="col-2 p-2 m-2 btn btn-primary border border-4 border-primary-subtle"
        >
          S.S.D.
        </Link>
        <Link to="/other" onClick={() => handleNavbarClick("other")}
        className="col-2 p-2 m-2 btn btn-primary border border-4 border-primary-subtle"
        >
          Other
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
