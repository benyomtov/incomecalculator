import React, { useState } from 'react';
import './Other.css';
import { Link } from 'react-router-dom';

const OtherIncomes = ({handleCalculatedIncome}) => {

  const [incomeInputs, setIncomeInputs] = useState([0]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);

  const handleAddIncome = () => {
    setIncomeInputs((prevInputs) => [...prevInputs, 0]);
  };

  const handleRemoveIncome = () => {
    if (incomeInputs.length > 1) {
      setIncomeInputs((prevInputs) => prevInputs.slice(0, -1));
    }
  };

  const handleIncomeChange = (index, value) => {
    const newInputs = [...incomeInputs];
    newInputs[index] = parseFloat(value);
    setIncomeInputs(newInputs);
  };

  const calculateTotalIncome = () => {

    if (incomeInputs.some(isNaN) || incomeInputs.length === 0 || incomeInputs.some((income) => income <= 0)) {
      setTotalIncome('Invalid Input');
      return;
    }

    const totalUnRounded = incomeInputs.reduce((acc, income) => acc + income, 0);
    const total = Math.round(totalUnRounded * 100) / 100;
    const totalRounded = total.toFixed(2);

    if (addToCurrentTotals) {
      const totalOtherIncome = localStorage.getItem('other');
      const totalOtherIncomeParsed = parseFloat(totalOtherIncome);
      const newTotalIncome = totalOtherIncomeParsed + parseFloat(totalRounded);
      localStorage.setItem('other', newTotalIncome);
      handleCalculatedIncome('other', newTotalIncome);
    } else {
        localStorage.setItem('other', totalRounded);
        handleCalculatedIncome('other', totalRounded);
    }

    setTotalIncome(total.toFixed(2));

  };

  const handleClearAndReset = () => {

    setAddToCurrentTotals(false);

    // Clear otherIncome from localStorage
    localStorage.removeItem('otherIncome');

    // Reset component state
    setIncomeInputs([0]);
    setTotalIncome(null);

    handleCalculatedIncome('other', 0);
  };


  return (
    <div>
      <div className="otherincome__input container-fluid text-center">
        <h2 className="fs-1 fw-bold">Other Annual Incomes</h2>
        <h3 className="fs-2 fw-semibold mb-3">
          Last chance! Please enter any other income here.
        </h3>
        <div className="border border-2 rounded p-2 mb-3">
          {incomeInputs.map((income, index) => (
            <div key={index}>
              <label
              className="fs-4 fw-semibold mb-3"
              >
                Income {index + 1}:
                <input
                  type="number"
                  min="0"
                  value={income}
                  onChange={(e) => handleIncomeChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
          <button 
          className="btn btn-light border border-3 border-success-subtle btn-lg me-3 mb-3"
          onClick={handleAddIncome}>Add Income</button>
          <button 
          className="btn btn-light border border-3 border-danger btn-lg me-3 mb-3"
          onClick={handleRemoveIncome}>Delete Income</button>
        </div>
        <br />
        <label
        className="fs-4 fw-semibold"
        >
          Add to current totals: {' '}
          <input
            type="checkbox"
            checked={addToCurrentTotals}
            onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
          />
        </label>
        <button 
        className="btn btn-primary border border-dark btn-lg ms-3"
        onClick={calculateTotalIncome}>Calculate Other Income</button>
      </div>
      <hr />
      <div className="otherincome__result container-fluid text-center">
        {totalIncome !== null && (
          <div>
            <p
            className="fs-5 mb-3"
            >
              Total Income: <strong>{totalIncome}</strong>
            </p>
            <button 
            className = "btn btn-danger btn-lg mb-3"
            onClick={handleClearAndReset}>Clear Other Income</button>
          </div>
        )}
        <Link to="/" 
        className="btn btn-dark border border-secondary border-4 fs-5"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default OtherIncomes;
