import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        const roundedDeductedIncome = calculatedDeductedIncome.toFixed(2);
        const calculatedNetIncome = grossIncome - roundedDeductedIncome;

        const weeklyNetIncome = calculatedNetIncome / 52;
        const roundedWeeklyNetIncome = weeklyNetIncome.toFixed(2);

        const hourlyWage = roundedWeeklyNetIncome / 30;
        const roundedHourlyWage = hourlyWage.toFixed(2);

        setResult({
            calculatedNetIncome: calculatedNetIncome,
            calculatedHourlyWage: roundedHourlyWage,
            eligibility: roundedHourlyWage < 15.13 ? 'Not Eligible for CCAP' : 'Eligible for CCAP'});
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
                </div>
            )}
            <Link to="/childsupport" >Child Support Calculator</Link>
            <Link to="/" >Back</Link>

        </div>
        </div>
    );
    }

export default SelfEmployed;