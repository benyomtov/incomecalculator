import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EligibilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(
    parseFloat(localStorage.getItem('annualIncome')) || 0
  );
  const [annualChildSupport, setAnnualChildSupport] = useState(
    parseFloat(localStorage.getItem('annualChildSupport')) || 0
  );
  const [annualSSD, setAnnualSSD] = useState(
    parseFloat(localStorage.getItem('annualSSD')) || 0
  );
  const [otherIncome, setOtherIncome] = useState(
    parseFloat(localStorage.getItem('otherIncome')) || 0
  );

  const [typeOfApplication, setTypeOfApplication] = useState('Initial');
  const [familySize, setFamilySize] = useState(1);
  
  // State variables for results
  const [showResults, setShowResults] = useState(false);
  const [grandTotal, setGrandTotal] = useState(null);
  const [eligibilityStatus, setEligibilityStatus] = useState(null);

  const calculateTotal = () => {
    const totalUnrounded = annualIncome + annualChildSupport + annualSSD + otherIncome;
    const roundedTotal = Math.round(totalUnrounded * 100) / 100;
    const grandTotal = roundedTotal.toFixed(2);
    setGrandTotal(grandTotal);
    
    const eligibility = determineEligibilityStatus();
    setEligibilityStatus(eligibility);
    
    setShowResults(true);
  };

  const determineEligibilityStatus = () => {
    const parsedGrandTotal = parseFloat(grandTotal);
  
    if (typeOfApplication === 'Initial') {
      switch (familySize) {
        case 1:
          return parsedGrandTotal <= 29160 ? 'Eligible' : 'Ineligible';
        case 2:
          return parsedGrandTotal <= 39440 ? 'Eligible' : 'Ineligible';
        case 3:
          return parsedGrandTotal <= 49720 ? 'Eligible' : 'Ineligible';
        case 4:
          return parsedGrandTotal <= 60000 ? 'Eligible' : 'Ineligible';
        case 5:
          return parsedGrandTotal <= 70280 ? 'Eligible' : 'Ineligible';
        case 6:
          return parsedGrandTotal <= 80560 ? 'Eligible' : 'Ineligible';
        case 7:
          return parsedGrandTotal <= 90840 ? 'Eligible' : 'Ineligible';
        case 8:
          return parsedGrandTotal <= 101120 ? 'Eligible' : 'Ineligible';
        case 9:
          return parsedGrandTotal <= 111400 ? 'Eligible' : 'Ineligible';
        case 10:
          return parsedGrandTotal <= 121680 ? 'Eligible' : 'Ineligible';
        case 11:
          return parsedGrandTotal <= 131960 ? 'Eligible' : 'Ineligible';
        case 12:
          return parsedGrandTotal <= 142240 ? 'Eligible' : 'Ineligible';
        default:
          return 'Ineligible';
      }
    } else if (typeOfApplication === 'Redetermination') {
      switch (familySize) {
        case 1:
          return parsedGrandTotal <= 36450
            ? 'Eligible'
            : parsedGrandTotal <= 64023
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 2:
          return parsedGrandTotal <= 49300
            ? 'Eligible'
            : parsedGrandTotal <= 78769
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 3:
          return parsedGrandTotal <= 62150
            ? 'Eligible'
            : parsedGrandTotal <= 100042
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 4:
          return parsedGrandTotal <= 75000
            ? 'Eligible'
            : parsedGrandTotal <= 119558
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 5:
          return parsedGrandTotal <= 87850
            ? 'Eligible'
            : parsedGrandTotal <= 127973
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 6:
          return parsedGrandTotal <= 100700
            ? 'Eligible'
            : parsedGrandTotal <= 136388
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 7:
          return parsedGrandTotal <= 113550
            ? 'Eligible'
            : parsedGrandTotal <= 144803
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 8:
          return parsedGrandTotal <= 126400
            ? 'Eligible'
            : parsedGrandTotal <= 153218
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 9:
          return parsedGrandTotal <= 139250
            ? 'Eligible'
            : parsedGrandTotal <= 161633
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 10:
          return parsedGrandTotal <= 152100
            ? 'Eligible'
            : parsedGrandTotal <= 170048
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 11:
          return parsedGrandTotal <= 164950
            ? 'Eligible'
            : parsedGrandTotal <= 178463
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        case 12:
          return parsedGrandTotal <= 177800
            ? 'Eligible'
            : parsedGrandTotal <= 186878
            ? 'Eligible-Graduated Phaseout'
            : 'Ineligible';
        default:
          return 'Ineligible';
      }
    } else {
      return 'Ineligible';
    }
  };

  const clearResults = () => {
    setAnnualIncome(0);
    setAnnualChildSupport(0);
    setAnnualSSD(0);
    setOtherIncome(0);
    setTypeOfApplication('Initial');
    setFamilySize(1);
    setShowResults(false);
    setGrandTotal(null);
    setEligibilityStatus(null);

    // Clear local storage
    localStorage.clear();
  };

  return (
    <div>
      <h1>Eligibility</h1>
      <h2>Current Totals</h2>
      <p>Annual Income: ${annualIncome}</p>
      <p>Annual Child Support: ${annualChildSupport}</p>
      <p>Annual SSD: ${annualSSD}</p>
      <p>Other Income: ${otherIncome}</p>

      <label>
        Type of Application:
        <select
          value={typeOfApplication}
          onChange={(e) => setTypeOfApplication(e.target.value)}
        >
          <option value="Initial">Initial Application</option>
          <option value="Redetermination">Redetermination</option>
        </select>
      </label>

      <label>
        Family Size:
        <select
          value={familySize}
          onChange={(e) => setFamilySize(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <button onClick={calculateTotal}>
        Calculate Total Income and Determine Eligibility Status
      </button>

      {showResults && (
        <div>
          <p>Grand Total: 
            <strong>
            ${grandTotal}
            </strong>
            
            </p>
          <p>Eligibility Status: 
            <strong>
            {eligibilityStatus}
            </strong>
            </p>

            <button onClick={clearResults}>
            Clear Results
            </button>
        </div>
      )}
      <Link to="/">Go back to the homepage</Link>
      <Link to="/other">Go back to Other</Link>
    </div>
  );
};

export default EligibilityCalculator;
