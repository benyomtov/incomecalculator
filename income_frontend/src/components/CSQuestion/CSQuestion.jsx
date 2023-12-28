import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayIncomes from '../DisplayIncomes/DisplayIncomes';
import './CSQuestion.css';

const CSQuestion = () => {
  const [receivesChildSupport, setReceivesChildSupport] = useState(null);
  const navigate = useNavigate();

  const handleYesClick = () => {
    setReceivesChildSupport(true);
  };

  const handleNoClick = () => {
    // If the user indicates that the applicant does not receive child support,
    // redirect to /eligibility
    navigate('/eligibility');
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
      <div className="csquestion__content">
        <h1 className="csquestion__title">Child Support</h1>
        <p className="csquestion__description">Child Support Question</p>

        {/* First question: Does the applicant receive child support? */}
        {receivesChildSupport === null && (
          <div>
            <button onClick={handleYesClick}>Yes, the applicant receives child support</button>
            <button onClick={handleNoClick}>No, the applicant does not receive child support</button>
          </div>
        )}

        {/* Second question: If yes, is the child support through a legal agreement? */}
        {receivesChildSupport && (
          <div>
            <p>Is the child support through a legal agreement?</p>
            <button onClick={handleLegalAgreementClick}>Yes, it's a legal agreement</button>
            <button onClick={handleUnofficialAgreementClick}>No, it's an unofficial agreement</button>
          </div>
        )}

        <Link to="/">Back to Homepage</Link>
        <Link to="/paystubs">Paystub Calculator</Link>
        <Link to="/selfemployed">Self-Employment Income Calculator</Link>
        <Link to="/eligibility">Eligibility</Link>
        
      </div>

        <DisplayIncomes />
        
    </div>
  );
};

export default CSQuestion;
