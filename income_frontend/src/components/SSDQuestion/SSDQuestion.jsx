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
        <h2
        className="fs-1 fw-bold"
        >Social Security Disability</h2>
        <h3
        className="fw-normal mb-3"
        >Does the applicant receive Social Security Disability?</h3>
        {receivesSSD === null && (
          <div className="ssd-question__buttons">
            <button className="ssd-question__button btn btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3" onClick={handleYesClick}>
              Yes, the applicant receives SSD.
            </button>
            <button className="ssd-question__button btn btn-light border border-4 border-primary-subtle fw-bold fs-5 mb-3" onClick={handleNoClick}>
              No, the applicant does not receive SSD.
            </button>
          </div>
        )}
      </div>
      <div className="ssd-question__input container-fluid text-center">
        {receivesSSD && (
          <div className="ssd-question__ssd-amount border border-2 rounded p-2 mb-3">
            <label
            className="fs-4 fw-semibold mb-3"
            >
              Enter monthly SSD amount:
              <input
                type="number"
                min = "0"
                value={ssdAmount}
                onChange={handleSSDAmountChange}
              />
            </label>
            <label
            className="fs-4 fw-semibold"
            >
              Add to Current Totals: {" "}
              <input
                type="checkbox"
                checked={addToCurrentTotals}
                onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
              />
            </label>
            <button 
            className="btn btn-primary border border-dark btn-lg ms-3"
            onClick={calculateAnnualSSD}>Calculate Annual SSD</button>
          </div>
        )}
      </div>
      <hr />
      <div className="ssd-question__output container-fluid text-center">
        {annualSSD !== null && (
          <div className="ssd-question__annual-ssd">
            <p
            className="fs-5 mb-3"
            >
              Annual SSD: {" "}
              <strong>{annualSSD}</strong>
            </p>
            <button 
            className = "btn btn-danger btn-lg mb-3"
            onClick={handleClearAndReset}>Clear SSD</button>
          </div>
          
        )}
        <Link 
        className="paystubs__link btn btn-dark border border-secondary border-4 fs-5"
        to="/">Back</Link>
      </div>
      
    </div>
  );
};

export default SSDQuestion;
