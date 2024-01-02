import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
      <div className="landing">
        <div className="landing__content container-fluid text-center">
            "<h2 className="landing__title fs-1 fw-bold">Primary Income</h2>
            <h3 className="landing__description fw-normal">
              Calculate primary income to determine elegibility for the CCAP
              program.
            </h3>
            <p className="landing__description fs-4 fw-light">
              Choose a calculator below:
            </p>
            <div className="landing__buttons container-fluid col-8 d-flex flex-column">
              <Link
                to="/paystubs"
                className="landing__button btn btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3"
              >
                Calculate Income from Paystubs
              </Link>
              <Link
                to="/selfemployed"
                className="landing__button btn btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3"
              >
                Calculate Income from Self-Employment
              </Link>
              <Link
                to="/incomefromempver"
                className="landing__button btn btn-light border border-4 border-primary-subtle fw-bold fs-5"
              >
                Calculate Income from Employment Verification Form
              </Link>
          </div>
        </div>
      </div>
    );
    }

export default Landing;

