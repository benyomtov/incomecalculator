import React, { useEffect, useState } from 'react';

const DisplayIncomes = () => {
  // State variables to store the retrieved data
  const [annualIncome, setAnnualIncome] = useState(null);
  const [annualChildSupport, setAnnualChildSupport] = useState(null);
  const [annualSSD, setAnnualSSD] = useState(null);
  const [otherIncome, setOtherIncome] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage
    const storedAnnualIncome = localStorage.getItem('annualIncome');
    const storedAnnualChildSupport = localStorage.getItem('annualChildSupport');
    const storedAnnualSSD = localStorage.getItem('annualSSD');
    const storedOtherIncome = localStorage.getItem('otherIncome');

    // Update state variables
    setAnnualIncome(storedAnnualIncome);
    setAnnualChildSupport(storedAnnualChildSupport);
    setAnnualSSD(storedAnnualSSD);
    setOtherIncome(storedOtherIncome);
  }, []);

  return (
    <div>
      <h1>Incomes Stored:</h1>
      <p>Annual Income: {annualIncome}</p>
      <p>Annual Child Support: {annualChildSupport}</p>
      <p>Annual SSD: {annualSSD}</p>
      <p>Other Income: {otherIncome}</p>
    </div>
  );
};

export default DisplayIncomes;
