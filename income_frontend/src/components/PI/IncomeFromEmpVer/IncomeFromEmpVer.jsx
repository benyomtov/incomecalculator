import React, { useState } from 'react';

const IncomeFromEmpVer = () => {
  const [hourlyWage, setHourlyWage] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [isSalaried, setIsSalaried] = useState(false);
  const [yearlySalary, setYearlySalary] = useState('');
  const [calculatedIncome, setCalculatedIncome] = useState('');

  const calculateIncome = () => {
    let income = 0;

    if (!isSalaried) {
      const weeklyIncome = parseFloat(hourlyWage) * parseFloat(hoursPerWeek);
      income = roundToNearestHundredth(weeklyIncome) * 52;
    } else {
      income = parseFloat(yearlySalary);
    }

    const roundedIncome = roundToNearestHundredth(income);
    setCalculatedIncome(roundedIncome);

    // Save to local storage
    localStorage.setItem('annualIncome', roundedIncome.toString());
  };

  const roundToNearestHundredth = (value) => {
    let valuePartiallyRounded = Math.round(value * 100) / 100;
    return valuePartiallyRounded.toFixed(2);
  };

  const handleClearIncome = () => {
    // Clear local storage and reset values
    localStorage.removeItem('annualIncome');
    setHourlyWage('');
    setHoursPerWeek('');
    setIsSalaried(false);
    setYearlySalary('');
    setCalculatedIncome('');
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

