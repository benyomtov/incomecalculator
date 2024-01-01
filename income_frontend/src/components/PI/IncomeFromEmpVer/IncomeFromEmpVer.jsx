import React, { useState } from 'react';

const IncomeFromEmpVer = ({handleCalculatedIncome}) => {
  const [hourlyWage, setHourlyWage] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [isSalaried, setIsSalaried] = useState(false);
  const [yearlySalary, setYearlySalary] = useState('');
  const [calculatedIncome, setCalculatedIncome] = useState('');
  const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);

  const calculateIncome = () => {

    if (!hourlyWage || !hoursPerWeek) {
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
        <h1>Income from Employer Verification Calculator</h1>
        <h2>This calculator is used to calculate income from an employment verification letter.</h2>
      <label>
        Hourly Wage:
        <input
          type="number"
          value={hourlyWage}
          onChange={(e) => setHourlyWage(e.target.value)}
        />
      </label>
      <br />
      <label>
        Hours per Week:
        <input
          type="number"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e.target.value)}
        />
      </label>
      <br />
      <label>
        Calculate Income Based on Yearly Salary:
        <input
          type="checkbox"
          checked={isSalaried}
          onChange={() => setIsSalaried(!isSalaried)}
        />
      </label>
      {isSalaried && (
        <>
          <br />
          <label>
            Enter Yearly Salary Here:
            <input
              type="number"
              value={yearlySalary}
              onChange={(e) => setYearlySalary(e.target.value)}
            />
          </label>
        </>
      )}
      <label>
        Add to Current Totals:
        <input
          type="checkbox"
          checked={addToCurrentTotals}
          onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
        />
      </label>
      <br />
      <button onClick={calculateIncome}>Calculate Income</button>
      <br />
      <button onClick={handleClearIncome}>Clear Primary Income</button>
      {calculatedIncome && (
        <div>
          <br />
          <label>Calculated Annual Income: ${calculatedIncome}</label>
        </div>
      )}
    </div>
  );
};

export default IncomeFromEmpVer;

