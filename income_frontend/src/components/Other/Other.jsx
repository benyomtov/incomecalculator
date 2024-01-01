import React, { useState } from 'react';

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
      <h1>Other Annual Incomes</h1>
      <p>Last chance! Please enter any other income here.</p>
      {incomeInputs.map((income, index) => (
        <div key={index}>
          <label>
            Income {index + 1}:
            <input
              type="number"
              value={income}
              onChange={(e) => handleIncomeChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleAddIncome}>+</button>
      <button onClick={handleRemoveIncome}>-</button>
      <label>
        Add to current totals:
        <input
          type="checkbox"
          checked={addToCurrentTotals}
          onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
        />
      </label>
      <button onClick={calculateTotalIncome}>Calculate Other Income</button>
      {totalIncome !== null && (
        <div>
          <p>Total Income: 
            
            <strong>
             ${totalIncome}
            </strong>
            
            </p>
        </div>
      )}
        <button onClick={handleClearAndReset}>Clear Other Income</button>
    </div>
  );
};

export default OtherIncomes;
