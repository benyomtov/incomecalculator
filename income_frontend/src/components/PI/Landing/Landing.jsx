import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
        <div className="landing__content">
            <h1 className="landing__title">Primary Income</h1>
            <p className="landing__description">Calculate primary income to determine elegibility for the CCAP program.</p>
            <p className="landing__description">Choose a calculator below:</p>
            <Link to="/paystubs" >Paystub Calculator</Link>
            <Link to="/selfemployed" >Self-Employment Income Calculator</Link>
            <Link to="/incomefromempver" >Income from Employer Verification Calculator</Link>
        </div>
        </div>
    );
    }

export default Landing;

