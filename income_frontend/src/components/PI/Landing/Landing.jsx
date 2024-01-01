import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
        <div className="landing__content container-fluid text-center">
            <h2 className="landing__title">Primary Income</h2>
            <h3 className="landing__description">Calculate primary income to determine elegibility for the CCAP program.</h3>
            <p className="landing__description">Choose a calculator below:</p>
            <Link to="/paystubs" >Calculate Income from Paystubs</Link>
            <Link to="/selfemployed" >Calculate Income from Self-Employment</Link>
            <Link to="/incomefromempver" >Calculate Income from Employment Verification Form</Link>
        </div>
        </div>
    );
    }

export default Landing;

