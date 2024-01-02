import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UnofficialCS.css';

const UnofficialCS = ({handleCalculatedIncome}) => {

    const [frequency, setFrequency] = useState('weekly');
    const [childSupportAmount, setChildSupportAmount] = useState('');
    const [annualChildSupport, setAnnualChildSupport] = useState(null);
    const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);

    const handleFrequencyChange = (event) => {
        setFrequency(event.target.value);
    };

    const handleChildSupportAmountChange = (event) => {
        setChildSupportAmount(event.target.value);
    };

    const calculateAnnualChildSupport = () => {

        if (isNaN(childSupportAmount) || !childSupportAmount || childSupportAmount <= 0) {

            setAnnualChildSupport('Invalid Input');
            return;
        }

        const parsedChildSupportAmount = parseFloat(childSupportAmount);

        switch (frequency) {
            case 'weekly':
                const weeklyChildSupportNotRounded = parsedChildSupportAmount * 4.333;
                const weeklyChildSupportPartiallyRounded = Math.round(weeklyChildSupportNotRounded * 100) / 100;
                const weeklyChildSupport = weeklyChildSupportPartiallyRounded.toFixed(2);
                const annualChildSupportNotRounded = weeklyChildSupport * 12;
                const annualChildSupportPartiallyRounded = Math.round(annualChildSupportNotRounded * 100) / 100;
                let annualChildSupport = annualChildSupportPartiallyRounded.toFixed(2);
                setAnnualChildSupport(annualChildSupport);
                if (addToCurrentTotals) {
                    const currentTotalUnparsed = localStorage.getItem('annualChildSupport');
                    const currentTotal = parseFloat(currentTotalUnparsed) || 0;
                    const newTotal = currentTotal + parseFloat(annualChildSupport);
                    localStorage.setItem('annualChildSupport', newTotal);
                    handleCalculatedIncome('childSupport', newTotal);
                    } else {
                    localStorage.setItem('annualChildSupport', parseFloat(annualChildSupport));
                    handleCalculatedIncome('childSupport', parseFloat(annualChildSupport));
                    }
                break;
            case 'biweekly':
                const biweeklyChildSupportNotRounded = parsedChildSupportAmount * 2.167;
                const biweeklyChildSupportPartiallyRounded = Math.round(biweeklyChildSupportNotRounded * 100) / 100;
                const biweeklyChildSupport = biweeklyChildSupportPartiallyRounded.toFixed(2);
                const annualChildSupportNotRounded2 = biweeklyChildSupport * 12;
                const annualChildSupportPartiallyRounded2 = Math.round(annualChildSupportNotRounded2 * 100) / 100;
                let annualChildSupport2 = annualChildSupportPartiallyRounded2.toFixed(2);
                setAnnualChildSupport(annualChildSupport2);
                if (addToCurrentTotals) {
                    const currentTotalUnparsed = localStorage.getItem('annualChildSupport');
                    const currentTotal = parseFloat(currentTotalUnparsed) || 0;
                    const newTotal = currentTotal + parseFloat(annualChildSupport2);
                    localStorage.setItem('annualChildSupport', newTotal);
                    handleCalculatedIncome('childSupport', newTotal);
                    } else {
                    localStorage.setItem('annualChildSupport', parseFloat(annualChildSupport2));
                    handleCalculatedIncome('childSupport', parseFloat(annualChildSupport2));
                    }
                break;
            case 'monthly':
                const monthlyChildSupportNotRounded = parsedChildSupportAmount * 12;
                const monthlyChildSupportPartiallyRounded = Math.round(monthlyChildSupportNotRounded * 100) / 100;
                let monthlyChildSupport = monthlyChildSupportPartiallyRounded.toFixed(2);
                setAnnualChildSupport(monthlyChildSupport);
                handleCalculatedIncome('childSupport', monthlyChildSupport);
                if (addToCurrentTotals) {
                    const currentTotalUnparsed = localStorage.getItem('annualChildSupport');
                    const currentTotal = parseFloat(currentTotalUnparsed) || 0;
                    const newTotal = currentTotal + parseFloat(monthlyChildSupport);
                    localStorage.setItem('annualChildSupport', newTotal);
                    handleCalculatedIncome('childSupport', newTotal);
                    } else {
                    localStorage.setItem('annualChildSupport', parseFloat(monthlyChildSupport));
                    handleCalculatedIncome('childSupport', parseFloat(monthlyChildSupport));
                    }
                break;
                default:
                    setAnnualChildSupport(null);
        }
    };

    const handleClearAndReset = () => {

        setAddToCurrentTotals(false);
        // Clear annualChildSupport in localStorage
        localStorage.removeItem('annualChildSupport');
        
        // Reset component state
        setChildSupportAmount('');
        setFrequency('weekly');
        setAnnualChildSupport(null);

        handleCalculatedIncome('childSupport', 0);
      };


    return (
      <div className="unofficialCS">
        <div className="unofficialCS__content">
          <div className="unofficialCS__input container-fluid text-center">
            <h2 className="unofficialCS__title fs-1 fw-bold">
              Child Support: Unofficial
            </h2>
            <h3 className="unofficialCS__description fs-2 fw-semibold mb-3">
              For calculating unofficial Child Support agreements between
              parents.
            </h3>
            <div className="border border-2 rounded p-2 mb-3">
              <label
              className="fs-4 fw-semibold mb-3"
              >
                Frequency:
                <select value={frequency} onChange={handleFrequencyChange}>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
              <label
              className="fs-5 fw-bold mb-3"
              >
                Child Support Amount:
                <input
                  type="number"
                  min="0"
                  value={childSupportAmount}
                  onChange={handleChildSupportAmountChange}
                />
              </label>
              <label
              className="fs-4 fw-semibold"
              >
                Add to Current Totals: {' '}
                <input
                  type="checkbox"
                  checked={addToCurrentTotals}
                  onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
                />
              </label>
              <button 
              className="btn btn-primary border border-dark btn-lg ms-3"
              onClick={calculateAnnualChildSupport}>Calculate</button>
            </div>
          </div>
          <hr />
          <div className="unofficialCS__results container-fluid text-center">
            {annualChildSupport !== null && (
              <div>
                <p
                className="fs-5 mb-3"
                >
                  Annual Child Support: <strong>{annualChildSupport}</strong>
                </p>
                <button 
                className = "btn btn-danger btn-lg mb-3"
                onClick={handleClearAndReset}>
                  Clear Child Support
                </button>
              </div>
            )}
            <Link to="/csquestion"
            className="paystubs__link btn btn-dark border border-secondary border-4 fs-5"
            >Back</Link>
          </div>
        </div>
      </div>
    );
}

export default UnofficialCS;