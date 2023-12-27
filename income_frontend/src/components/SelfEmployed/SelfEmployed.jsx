import React from 'react';
import { Link } from 'react-router-dom';
import './SelfEmployed.css';

const SelfEmployed = () => {
    return (
        <div className="selfemployed">
        <div className="selfemployed__content">
            <h1 className="selfemployed__title">Self-Employed</h1>
            <p className="selfemployed__description">Calculate Self-Employed Income</p>
            <Link to="/" >Back</Link>

        </div>
        </div>
    );
    }

export default SelfEmployed;