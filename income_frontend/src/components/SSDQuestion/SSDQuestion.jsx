import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SSDQuestion.css";

const SSDQuestion = ({ handleCalculatedIncome }) => {
  const navigate = useNavigate();

  const [receivesSSD, setReceivesSSD] = useState(null);
  const [ssdAmount, setSSDAmount] = useState("");
  const [annualSSD, setAnnualSSD] = useState(null);
  const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);

  const handleYesClick = () => {
    setReceivesSSD(true);
  };

  const handleNoClick = () => {
    setReceivesSSD(false);
    localStorage.setItem("annualSSD", 0);
    navigate("/");
  };

  const handleSSDAmountChange = (event) => {
    setSSDAmount(event.target.value);
  };

  const calculateAnnualSSD = () => {
    const parsedSSDAmount = parseFloat(ssdAmount);

    if (isNaN(parsedSSDAmount) || !ssdAmount || parsedSSDAmount <= 0) {
      setAnnualSSD("Invalid Input");
      return;
    }

    const annualSSDAmountPartiallyRounded =
      Math.round(parsedSSDAmount * 12 * 100) / 100;
    const annualSSDAmount = annualSSDAmountPartiallyRounded.toFixed(2);

    if (addToCurrentTotals) {
      const currentTotalUnparsed = localStorage.getItem("currentTotal");
      const currentTotal = parseFloat(currentTotalUnparsed) || 0;
      const newTotal = currentTotal + parseFloat(annualSSDAmount);
      localStorage.setItem("currentTotal", newTotal);
      handleCalculatedIncome("ssd", newTotal);
    } else {
      localStorage.setItem("currentTotal", parseFloat(annualSSDAmount));
      handleCalculatedIncome("ssd", parseFloat(annualSSDAmount));
    }

    setAnnualSSD(annualSSDAmount);
  };

  const handleClearAndReset = () => {
    setAddToCurrentTotals(false);

    // Clear annualSSD from localStorage
    localStorage.removeItem("annualSSD");

    // Reset component state
    setSSDAmount("");
    setAnnualSSD(null);

    handleCalculatedIncome("ssd", 0);
  };

  return (
    <div className="ssd-question">
      <div className="ssd-question__header container-fluid text-center">
        <h2>Social Security Disability</h2>
        <h3>Does the applicant receive Social Security Disability?</h3>
        {receivesSSD === null && (
          <div className="ssd-question__buttons">
            <button className="ssd-question__button" onClick={handleYesClick}>
              Yes, the applicant receives SSD.
            </button>
            <button className="ssd-question__button" onClick={handleNoClick}>
              No, the applicant does not receive SSD.
            </button>
          </div>
        )}
      </div>
      <div className="ssd-question__input container-fluid text-center">
        {receivesSSD && (
          <div className="ssd-question__ssd-amount">
            <label>
              Enter monthly SSD amount:
              <input
                type="number"
                min = "0"
                value={ssdAmount}
                onChange={handleSSDAmountChange}
              />
            </label>
            <label>
              Add to Current Totals:
              <input
                type="checkbox"
                checked={addToCurrentTotals}
                onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
              />
            </label>
            <button onClick={calculateAnnualSSD}>Calculate Annual SSD</button>
          </div>
        )}
      </div>
      <hr />
      <div className="ssd-question__output container-fluid text-center">
        {annualSSD !== null && (
          <div className="ssd-question__annual-ssd">
            <p>
              Annual SSD: {" "}
              <strong>{annualSSD}</strong>
            </p>
            <button onClick={handleClearAndReset}>Clear SSD</button>
          </div>
          
        )}
        <Link to="/">Back</Link>
      </div>
      
    </div>
  );
};

export default SSDQuestion;
