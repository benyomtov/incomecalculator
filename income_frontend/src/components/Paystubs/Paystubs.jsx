import React from 'react';
import { Link } from 'react-router-dom';
import './Paystubs.css';

const Paystubs = () => {
    return (
        <div className="paystubs">
        <div className="paystubs__content">
            <h1 className="paystubs__title">Paystubs</h1>
            <p className="paystubs__description">Calculate Paystubs</p>
            <Link to="/" >Back</Link>

        </div>
        </div>
    );
    }

export default Paystubs;