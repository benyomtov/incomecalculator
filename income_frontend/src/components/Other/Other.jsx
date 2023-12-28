import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OtherIncomes = () => {
  const navigate = useNavigate();

  const [incomeInputs, setIncomeInputs] = useState([0]);
  const [totalIncome, setTotalIncome] = useState(null);

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
    const totalUnRounded = incomeInputs.reduce((acc, income) => acc + income, 0);
    const total = Math.round(totalUnRounded * 100) / 100;
    setTotalIncome(total.toFixed(2));
  };

  const handleSaveAndContinue = () => {
    if (totalIncome !== null) {
      localStorage.setItem('otherIncome', totalIncome);
      navigate('/eligibility');
    }
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
      <button onClick={calculateTotalIncome}>Calculate Other Income</button>
      {totalIncome !== null && (
        <div>
          <p>Total Income: 
            
            <strong>
             ${totalIncome}
            </strong>
            
            </p>
          <button onClick={handleSaveAndContinue}>Save and Continue</button>
        </div>
      )}
        <Link to="/ssdquestion">Back</Link>
    </div>
  );
};

export default OtherIncomes;
