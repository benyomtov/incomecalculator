import React, { useState } from 'react';
import './SelfEmployed.css';

const SelfEmployed = () => {

    const [grossIncome, setGrossIncome] = useState('');
    const [result, setResult] = useState(null);

    const hadleGrossIncomeChange = (event) => {
        setGrossIncome(event.target.value);
    };

    const handleNetIncomeCalculation = (event) => {
        event.preventDefault();

        if (!grossIncome) {
            setResult(null);
            return;
        }

        if (isNaN(grossIncome)) {
            setResult({
                calculatedNetIncome: 'Please enter a valid number'
            });
            return;
        }

        const calculatedDeductedIncome = grossIncome * 0.51;
        const partiallyRoundedDeductedIncome =  Math.round(calculatedDeductedIncome * 100) / 100;
        const roundedDeductedIncome = partiallyRoundedDeductedIncome.toFixed(2);
        const calculatedNetIncomeNotRounded = grossIncome - roundedDeductedIncome;
        const calculatedNetIncomePartiallyRounded = Math.round(calculatedNetIncomeNotRounded * 100) / 100;
        const calculatedNetIncome = calculatedNetIncomePartiallyRounded.toFixed(2);

        const weeklyNetIncome = calculatedNetIncome / 52;
        const partiallyRoundedWeeklyNetIncome = Math.round(weeklyNetIncome * 100) / 100;
        const roundedWeeklyNetIncome = partiallyRoundedWeeklyNetIncome.toFixed(2);

        const hourlyWage = roundedWeeklyNetIncome / 30;
        const partiallyRoundedHourlyWage = Math.round(hourlyWage * 100) / 100;
        const roundedHourlyWage = partiallyRoundedHourlyWage.toFixed(2);

       const newResult = {
        calculatedNetIncome: calculatedNetIncome,
        calculatedHourlyWage: roundedHourlyWage,
        eligibility: roundedHourlyWage < 15.13 ? 'Not Eligible for CCAP' : 'Eligible for CCAP'
    };

    setResult(newResult);

    localStorage.setItem('annualIncome', newResult.calculatedNetIncome);
    };

    const clearIncome = () => {
        localStorage.removeItem('annualIncome');
        setGrossIncome('');
        setResult(null);
      };

    return (
        <div className="selfemployed">
        <div className="selfemployed__content">
            <h1 className="selfemployed__title">Self-Employed</h1>
            <p className="selfemployed__description">Calculate Self-Employed Income</p>
            <form onSubmit={handleNetIncomeCalculation}>
                <label htmlFor="grossIncome">Gross Income</label>
                <input
                    id="grossIncome"
                    type="text"
                    value={grossIncome}
                    onChange={hadleGrossIncomeChange}
                />
                <button type="submit">Calculate</button>
            </form>
            {result && (
                <div className="selfemployed__result">
                    <p>Net Income: ${result.calculatedNetIncome}</p>
                    <p>Hourly Wage: ${result.calculatedHourlyWage}</p>
                    <p>Eligibility: {result.eligibility}</p>
                    <button onClick={clearIncome}>Clear Income</button>
                </div>
            )}

        </div>
        </div>
    );
    }

export default SelfEmployed;