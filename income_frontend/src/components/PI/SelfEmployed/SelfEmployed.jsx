import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SelfEmployed.css';

const SelfEmployed = ({handleCalculatedIncome}) => {

    const [grossIncome, setGrossIncome] = useState('');
    const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);
    const [result, setResult] = useState(null);

    const hadleGrossIncomeChange = (event) => {
        setGrossIncome(event.target.value);
    };

    const handleNetIncomeCalculation = (event) => {
        event.preventDefault();

        if (!grossIncome || isNaN(grossIncome)) {
            setResult({
              calculatedNetIncome: 'Invalid Input',
              calculatedHourlyWage: 'Invalid Input',
              eligibility: 'Invalid Input',
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

    if (addToCurrentTotals) {
        const currentTotal = parseFloat(localStorage.getItem('annualIncome')) || 0;
        const newTotal = currentTotal + parseFloat(newResult.calculatedNetIncome);
        localStorage.setItem('annualIncome', newTotal);
        handleCalculatedIncome('primaryIncome', newTotal);
      } else {
        localStorage.setItem('annualIncome', parseFloat(newResult.calculatedNetIncome));
        handleCalculatedIncome('primaryIncome', parseFloat(newResult.calculatedNetIncome));
      }

    };

    const clearIncome = () => {

        setAddToCurrentTotals(false);

        localStorage.removeItem('annualIncome');
        setGrossIncome('');
        setResult(null);

        handleCalculatedIncome('primaryIncome', 0);

      };

    return (
        <div className="selfemployed">
        <div className="selfemployed__content">
            <div className='selfemployed__input container-fluid text-center'>
            <h2 className="selfemployed__title">Self-Employed</h2>
            <h3 className="selfemployed__description">Calculate primary income based on Schedule C tax form</h3>
            <form onSubmit={handleNetIncomeCalculation}>
                <label htmlFor="grossIncome">Gross Income</label>
                <input
                    id="grossIncome"
                    type="number"
                    min="0"
                    value={grossIncome}
                    onChange={hadleGrossIncomeChange}
                />
                <br />

                <label>
                    Add to Current Totals:
                    <input
                        type="checkbox"
                        checked={addToCurrentTotals}
                        onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
                    />
                </label>
                <button type="submit">Calculate</button>
            </form>
            </div>
            <hr />
            <div className="selfemployed__output container-fluid text-center">
            {result && (
                <div className="selfemployed__result">
                    <p>Net Income: 
                        <strong> {result.calculatedNetIncome}</strong>
                    </p>
                    <p>
                        Hourly Wage:
                        <strong> {result.calculatedHourlyWage}</strong>
                    </p>
                    <p>Eligibility:
                        <strong> {result.eligibility}</strong>
                    </p>
                    <button onClick={clearIncome}>Clear Income</button>
                </div>
            )}
            <Link to="/income">Back</Link>
            </div>
        </div>
        </div>
    );
    }

export default SelfEmployed;