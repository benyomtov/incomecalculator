import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CSQuestion.css';

const CSQuestion = () => {
  const [receivesChildSupport, setReceivesChildSupport] = useState(null);
  const navigate = useNavigate();

  const handleYesClick = () => {
    setReceivesChildSupport(true);
  };

  const handleNoClick = () => {
    localStorage.setItem('annualChildSupport', 0);
    navigate('/');
  };

  const handleLegalAgreementClick = () => {
    // If the user indicates that the child support is through a legal agreement,
    // redirect to /childsupport
    navigate('/childsupport');
  };

  const handleUnofficialAgreementClick = () => {
    // If the user indicates that the child support is through an unofficial agreement,
    // redirect to /unofficialcs
    navigate('/unofficialcs');
  };

  return (
    <div className="csquestion">
      <div className="csquestion__content container-fluid text-center">
        <h2 className="csquestion__title fs-1 fw-bold
        
        ">Child Support</h2>
        <h3 className="csquestion__description fw-normal mb-3
        ">Does the applicant receive child support?</h3>

        {/* First question: Does the applicant receive child support? */}
        {receivesChildSupport === null && (
          <div>
            <button 
            className="btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3"
            onClick={handleYesClick}>Yes, the applicant receives child support</button>
            <button
            className="btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3"
            onClick={handleNoClick}>No, the applicant does not receive child support</button>
          </div>
        )}

        {/* Second question: If yes, is the child support through a legal agreement? */}
        {receivesChildSupport && (
          <div>
            <p
            className="fs-4 fw-light mb-3"
            >Is the child support through a legal agreement?</p>
            <button 
             className="btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3"
            onClick={handleLegalAgreementClick}>Yes, it's a legal agreement</button>
            <button 
             className="btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3"
            onClick={handleUnofficialAgreementClick}>No, it's an unofficial agreement</button>
          </div>
        )}
        <hr />
        <Link to="/"
        className="paystubs__link btn btn-dark border border-secondary border-4 fs-5"
        >Back</Link>
      </div>
    </div>
  );
};

export default CSQuestion;
