import React from 'react';
import { Link } from 'react-router-dom';
import './ChildSupport.css';

const ChildSupport = () => {
    return (
        <div className="childsupport">
        <div className="childsupport__content">
            <h1 className="childsupport__title">Child Support</h1>
            <p className="childsupport__description">Calculate Child Support</p>
            <Link to="/" >Back</Link>

        </div>
        </div>
    );
    }

export default ChildSupport;