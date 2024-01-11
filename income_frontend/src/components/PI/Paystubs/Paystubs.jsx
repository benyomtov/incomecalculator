import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Paystubs.css";

const Paystubs = ({ handleCalculatedIncome }) => {
  const [grossIncomes, setGrossIncomes] = useState(Array(1).fill(""));
  const [numOtherIncomes, setNumOtherIncomes] = useState(0);
  const [otherIncomes, setOtherIncomes] = useState(
    Array(numOtherIncomes).fill("")
  );
  const [payFrequency, setPayFrequency] = useState("monthly");
  const [result, setResult] = useState(null);
  const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);

  const handlePayFrequencyChange = (event) => {
    setPayFrequency(event.target.value);

    switch (event.target.value) {
      case "monthly":
        setGrossIncomes(Array(1).fill(""));
        break;
      case "semi-monthly":
      case "bi-weekly":
        setGrossIncomes(Array(2).fill(""));
        break;
      case "weekly":
        setGrossIncomes(Array(4).fill(""));
        break;
      default:
        setGrossIncomes([]);
        break;
    }
  };

  const handleInputChange = (index, value, isOtherIncome = false) => {
    if (isOtherIncome) {
      const newOtherIncomes = [...otherIncomes];
      newOtherIncomes[index] = value;
      setOtherIncomes(newOtherIncomes);
    } else {
      const newGrossIncomes = [...grossIncomes];
      newGrossIncomes[index] = value;
      setGrossIncomes(newGrossIncomes);
    }
  };

  const handleNumOtherIncomesChange = (event) => {
    // Get the input value and default to 0 if blank or not a valid number
    const inputValue = event.target.value.trim();
    const inPutValueRounded = Math.round(inputValue * 100) / 100;
    const inputValueFixed = inPutValueRounded.toFixed(2);
    const newNumOtherIncomes = parseInt(inputValueFixed, 10) || 0;

    // Ensure the number of other incomes is non-negative
    const nonNegativeNumOtherIncomes =
      newNumOtherIncomes < 0 ? 0 : newNumOtherIncomes;

    // Update the number of other incomes
    setNumOtherIncomes(nonNegativeNumOtherIncomes);

    // Update the other incomes array based on the new number
    setOtherIncomes((prevOtherIncomes) => {
      // Slice the array to the new length
      const newOtherIncomes = prevOtherIncomes.slice(
        0,
        nonNegativeNumOtherIncomes
      );
      // If the length increased, fill the remaining slots with an empty string
      while (newOtherIncomes.length < nonNegativeNumOtherIncomes) {
        newOtherIncomes.push("");
      }
      return newOtherIncomes;
    });
  };

  const calculateAnnualIncome = () => {
    const parsedGrossIncomes = grossIncomes.map((grossIncome) =>
      parseFloat(grossIncome)
    );
    const parsedOtherIncomes = otherIncomes.map((otherIncome) =>
      parseFloat(otherIncome)
    );

    if (
      parsedGrossIncomes.some(isNaN) ||
      parsedOtherIncomes.some(isNaN) ||
      parsedGrossIncomes.length === 0
    ) {
      setResult({
        annualIncome: "Invalid Input",
        averageGrossIncome: "Invalid Input",
      });
      return;
    }

    const averageGrossIncomeNotRounded =
      parsedGrossIncomes.reduce((acc, income) => acc + income, 0) /
      parsedGrossIncomes.length;
    const averageGrossIncomePartiallyRounded =
      Math.round(averageGrossIncomeNotRounded * 100) / 100;
    const averageGrossIncome = averageGrossIncomePartiallyRounded.toFixed(2);

    let annualIncomeNotRounded;
    let annualIncomePartiallyRounded;
    let annualIncomeRounded;
    let annualIncome;
    let totalOtherIncome;

    switch (payFrequency) {
      case "monthly":
        annualIncomeNotRounded = averageGrossIncome * 12;
        break;
      case "semi-monthly":
        annualIncomeNotRounded = averageGrossIncome * 24;
        break;
      case "bi-weekly":
        annualIncomeNotRounded = averageGrossIncome * 26;
        break;
      case "weekly":
        annualIncomeNotRounded = averageGrossIncome * 52;
        break;
      default:
        setResult(null);
        return;
    }

    annualIncomePartiallyRounded =
      Math.round(annualIncomeNotRounded * 100) / 100;
    annualIncomeRounded = annualIncomePartiallyRounded.toFixed(2);
    totalOtherIncome = parsedOtherIncomes.reduce(
      (acc, income) => acc + income,
      0
    );
    annualIncomeNotRounded =
      parseFloat(annualIncomeRounded) + parseFloat(totalOtherIncome);
    annualIncomePartiallyRounded =
      Math.round(annualIncomeNotRounded * 100) / 100;
    annualIncome = annualIncomePartiallyRounded.toFixed(2);

    if (addToCurrentTotals) {
      const currentAnnualIncome = localStorage.getItem("annualIncome");
      const currentAnnualIncomeParsed = parseFloat(currentAnnualIncome);
      const newAnnualIncome =
        currentAnnualIncomeParsed + parseFloat(annualIncome);
      const newAnnualIncomePartiallyRounded = Math.round(newAnnualIncome * 100) / 100;
      const newAnnualIncomeRounded = newAnnualIncomePartiallyRounded.toFixed(2);
      localStorage.setItem("annualIncome", newAnnualIncomeRounded);
      handleCalculatedIncome("primaryIncome", newAnnualIncomeRounded);
    } else {
      localStorage.setItem("annualIncome", annualIncome);
      handleCalculatedIncome("primaryIncome", annualIncome);
    }

    setResult({
      annualIncome,
      annualIncomeRounded,
      averageGrossIncome,
      totalOtherIncome,
    });
  };

  const clearIncome = () => {
    setAddToCurrentTotals(false);

    localStorage.removeItem("annualIncome");
    setGrossIncomes(Array(1).fill(""));
    setNumOtherIncomes(0);
    setOtherIncomes(Array(0).fill(""));
    setPayFrequency("monthly");
    setResult(null);

    handleCalculatedIncome("primaryIncome", 0);
  };

  return (
    <div className="paystubs">
      <div className="paystubs__content">
        <div className="paystubs__inputs container-fluid text-center">
          <h2 className="paystubs__title fs-1 fw-bold">Paystubs</h2>
          <h3 className="paystubs__description fs-2 fw-semibold mb-3">
            Calculate primary income based on paystubs
          </h3>
          <div className="border border-2 rounded p-2 mb-3">
            <label className="paystubs__label fs-4 fw-semibold mb-3">
              Select Number of Paystubs:
              <select value={payFrequency} onChange={handlePayFrequencyChange}>
                <option value="monthly">Monthly</option>
                <option value="semi-monthly">Semi-Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>

            {grossIncomes.map((grossIncome, index) => (
              <div key={index}>
                <label
                className = "paystubs__label fs-5 fw-bold mb-3"
                >
                  Gross Income #{index + 1}:
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(event) =>
                      handleInputChange(index, event.target.value)
                    }
                    placeholder={`Enter Gross Income #${index + 1}`}
                  />
                </label>
              </div>
            ))}

            <label
            className = "paystubs__label fs-4 fw-semibold mb-3"
            >
              Select Number of Other Incomes:
              <input
                type="number"
                value={numOtherIncomes}
                onChange={handleNumOtherIncomesChange}
                placeholder="Enter Number of Other Incomes"
              />
            </label>

            {otherIncomes.map((otherIncome, index) => (
              <div key={index}>
                <label
                className="paystubs__label fs-5 fw-bold mb-3"
                >
                  Other Income #{index + 1}:
                  <input
                    type="number"
                    min="0"
                    value={otherIncome}
                    onChange={(event) =>
                      handleInputChange(index, event.target.value, true)
                    }
                    placeholder={`Enter Other Income #${index + 1}`}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <label
            className = "paystubs__label fs-4 fw-semibold"
            >
              Add to Current Totals: {" "}
              <input
                type="checkbox"
                checked={addToCurrentTotals}
                onChange={(event) =>
                  setAddToCurrentTotals(event.target.checked)
                }
              />
            </label>

            <button onClick={calculateAnnualIncome}
            className="btn btn-primary border border-dark btn-lg ms-3"
            >Calculate</button>
          </div>
        </div>
        <hr />
        <div className="paystubs__result container-fluid text-center">
          {result && (
            <div className="paystubs__result">
              <p
              className = "paystubs__label fs-5 mb-3"
              >
                Average Gross Income:{" "}
                <strong>{result.averageGrossIncome}</strong>
              </p>
              <p
              className = "paystubs__label fs-5 mb-3"
              >
                Total Other Income: <strong>{result.totalOtherIncome}</strong>
              </p>
              <p
              className = "paystubs__label fs-5 mb-3"
              >
                Annual Income: <strong>{result.annualIncomeRounded}</strong>
              </p>
              <p
              className = "paystubs__label fs-5 mb-3"
              >
                Annual Income Plus Other: <strong>{result.annualIncome}</strong>
              </p>
              <button onClick={clearIncome}
              className = "btn btn-danger btn-lg mb-3"
              >Clear Income</button>
            </div>
          )}
          <Link to="/" className="paystubs__link btn btn-dark border border-secondary border-4 fs-5">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Paystubs;
