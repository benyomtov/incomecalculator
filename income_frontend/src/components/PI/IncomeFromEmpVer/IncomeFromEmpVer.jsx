import React, { useState } from 'react';
import './IncomeFromEmpVer.css';
import { Link } from 'react-router-dom';

const IncomeFromEmpVer = ({handleCalculatedIncome}) => {
  const [hourlyWage, setHourlyWage] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [isSalaried, setIsSalaried] = useState(false);
  const [yearlySalary, setYearlySalary] = useState('');
  const [calculatedIncome, setCalculatedIncome] = useState('');
  const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);

  const handleHourlyWageChange = (e) => {
    const value = Math.max(0, parseFloat(e.target.value));
    setHourlyWage(value);
  };
  
  const handleHoursPerWeekChange = (e) => {
    const value = Math.max(0, parseFloat(e.target.value));
    setHoursPerWeek(value);
  };
  
  const handleYearlySalaryChange = (e) => {
    const value = Math.max(0, parseFloat(e.target.value));
    setYearlySalary(value);
  };

  const calculateIncome = () => {

    if (!isSalaried && (!hourlyWage || !hoursPerWeek)) {
        setCalculatedIncome('Invalid Input');
        return;
    }

    if (isSalaried && !yearlySalary) {
        setCalculatedIncome('Invalid Input');
        return;
    }

    let income = 0;

    if (!isSalaried) {
      const weeklyIncome = parseFloat(hourlyWage) * parseFloat(hoursPerWeek);
      income = roundToNearestHundredth(weeklyIncome) * 52;
    } else {
      income = parseFloat(yearlySalary);
    }

    const roundedIncome = roundToNearestHundredth(income);

    setCalculatedIncome(roundedIncome);

   if (addToCurrentTotals) {
        const currentTotal = parseFloat(localStorage.getItem('annualIncome')) || 0;
        const newTotal = currentTotal + parseFloat(roundedIncome);
        localStorage.setItem('annualIncome', newTotal);
        handleCalculatedIncome('primaryIncome', newTotal);
        } else {
        localStorage.setItem('annualIncome', parseFloat(roundedIncome));
        handleCalculatedIncome('primaryIncome', parseFloat(roundedIncome));
        }
  };

  const roundToNearestHundredth = (value) => {
    let valuePartiallyRounded = Math.round(value * 100) / 100;
    return valuePartiallyRounded.toFixed(2);
  };

  const handleClearIncome = () => {

    setAddToCurrentTotals(false);

    // Clear local storage and reset values
    localStorage.removeItem('annualIncome');
    setHourlyWage('');
    setHoursPerWeek('');
    setIsSalaried(false);
    setYearlySalary('');
    setCalculatedIncome('');

    handleCalculatedIncome('primaryIncome', 0);

  };

  return (
    <div>
      <div className="income-from-emp-ver__input container-fluid text-center">
        <h2 className="income-from-emp-ver__header fs-1 fw-bold">
          Income from Employment Verification Calculator
        </h2>
        <h3 className="income-from-emp-ver__subheader fs-2 fw-semibold mb-3">
          This calculator is used to calculate income from an employment
          verification letter.
        </h3>
        <div className="border border-2 rounded p-2 mb-3">
          <label className="fs-4 fw-semibold mb-3">
            Hourly Wage:
            <input
              type="number"
              value={hourlyWage}
              onChange={handleHourlyWageChange}
            />
          </label>
          <br />
          <label className="fs-4 fw-semibold mb-3">
            Hours per Week:
            <input
              type="number"
              value={hoursPerWeek}
              onChange={handleHoursPerWeekChange}
            />
          </label>
          <br />
          <label className = "fs-5 fw-normal mb-3">
            Calculate Income Based on Yearly Salary: {' '}
            <input
              type="checkbox"
              checked={isSalaried}
              onChange={() => setIsSalaried(!isSalaried)}
            />
          </label>
          {isSalaried && (
            <>
              <br />
              <label className="fs-4 fw-semibold mb-3">
                Enter Yearly Salary Here:
                <input
                  type="number"
                  value={yearlySalary}
                  onChange={handleYearlySalaryChange}
                />
              </label>
            </>
          )}
        </div>
        <br />
        <label className="fs-4 fw-semibold" >
          Add to Current Totals: {' '}
          <input 
            type="checkbox"
            checked={addToCurrentTotals}
            onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
          />
        </label>
        <button 
        className="btn btn-primary border border-dark btn-lg ms-3"
        onClick={calculateIncome}>Calculate Income</button>
      </div>
      <hr />
      <div className="container-fluid text-center">
        {calculatedIncome && (
          <div>
            <label
            className="fs-4 mb-3"
            >
              Calculated Annual Income: <strong>{calculatedIncome}</strong>
            </label>
            <br />
            <button 
            className = "btn btn-danger btn-lg mb-3"
            onClick={handleClearIncome}>Clear Primary Income</button>
          </div>
        )}
        <Link to="/"
        className="paystubs__link btn btn-dark border border-secondary border-4 fs-5"
        >Back</Link>
      </div>
    </div>
  );
};

export default IncomeFromEmpVer;

