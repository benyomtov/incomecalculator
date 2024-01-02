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
          <div className="selfemployed__input container-fluid text-center">
            <h2
              className="selfemployed__title fs-1 fw-bold
            "
            >
              Self-Employed
            </h2>
            <h3
              className="selfemployed__description fs-2 fw-semibold mb-3
            "
            >
              Calculate primary income based on Schedule C tax form
            </h3>
            <form onSubmit={handleNetIncomeCalculation}>
              <div className="border border-2 rounded p-2 mb-3">
                <label htmlFor="grossIncome"
                className="form-label fs-4 fw-semibold pt-2 mb-3"
                >Gross Income</label>
                <input
                  id="grossIncome"
                    className="fs-4"
                  type="number"
                  min="0"
                  value={grossIncome}
                  onChange={hadleGrossIncomeChange}
                />
              </div>
              <br />

              <label
                className = "paystubs__label fs-4 fw-semibold"
              >
                Add to Current Totals: {' '}
                <input
                  type="checkbox"
                  checked={addToCurrentTotals}
                  onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
                />
              </label>
              <button type="submit"
              className="btn btn-primary border border-dark btn-lg ms-3"
              >Calculate</button>
            </form>
          </div>
          <hr />
          <div className="selfemployed__output container-fluid text-center">
            {result && (
              <div className="selfemployed__result">
                <p
                className = "paystubs__label fs-5 mb-3"
                >
                  Net Income:
                  <strong> {result.calculatedNetIncome}</strong>
                </p>
                <p
                className = "paystubs__label fs-5 mb-3"
                >
                  Hourly Wage:
                  <strong> {result.calculatedHourlyWage}</strong>
                </p>
                <p
                className = "paystubs__label fs-5 mb-3"
                >
                  Eligibility:
                  <strong> {result.eligibility}</strong>
                </p>
                <button onClick={clearIncome}
                className = "btn btn-danger btn-lg mb-3"
                >Clear Income</button>
              </div>
            )}
            <Link to="/income"
            className="paystubs__link btn btn-dark border border-secondary border-4 fs-5"
            >Back</Link>
          </div>
        </div>
      </div>
    );
    }

export default SelfEmployed;