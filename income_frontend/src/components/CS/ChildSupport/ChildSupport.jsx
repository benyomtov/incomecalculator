import React, { useState } from 'react';
import './ChildSupport.css';
import { Link } from 'react-router-dom';

const ChildSupport = ({handleCalculatedIncome}) => {

    const [childPayments, setChildPayments] = useState([]);
    const [numChildren, setNumChildren] = useState('one child');
    const [isLumpSum, setIsLumpSum] = useState([]);
    const [annualChildSupport, setAnnualChildSupport] = useState(null);
    const [addToCurrentTotals, setAddToCurrentTotals] = useState(false);

    const handleInputChange = (index, value) => {
        const newChildPayments = [...childPayments];
        newChildPayments[index] = value;
        setChildPayments(newChildPayments);
    };

    const handleLumpSumChange = (index, checked) => {
        const newIsLumpSum = [...isLumpSum];
        newIsLumpSum[index] = checked;
        setIsLumpSum(newIsLumpSum);
    };

    const handleaddChildPayment = () => {
        setChildPayments([...childPayments, 0]);
        setIsLumpSum([...isLumpSum, false]);
    };

    const handleRemoveChildPayment = () => {
      const newChildPayments = [...childPayments];
      newChildPayments.splice(newChildPayments.length - 1, 1);
      setChildPayments(newChildPayments);
  
      const newIsLumpSum = [...isLumpSum];
      newIsLumpSum.splice(newIsLumpSum.length - 1, 1);
      setIsLumpSum(newIsLumpSum);
    };

    const calculateAnnualChildSupport = () => {

        const parsedChildPayments = childPayments.map((childPayment) => parseFloat(childPayment));

        if (parsedChildPayments.some(isNaN) 
        || parsedChildPayments.length === 0
        || isLumpSum.length !== parsedChildPayments.length
        || parsedChildPayments.some((childPayment) => childPayment <= 0)) {

            setAnnualChildSupport({
                annualChildSupport: 'Invalid Input',
            });
            return;
        }


        let totalChildPayments = 0;

        for (let i = 0; i < parsedChildPayments.length; i++) {
            const isLumpSumPayment = isLumpSum[i];
            const currentChildPayment = parsedChildPayments[i];
          
            switch (numChildren) {
              case 'one child':
                if (isLumpSumPayment) {
                  let lumpSumChildPaymentNotRounded = currentChildPayment * 0.3;
                  let lumpSumChildPaymentRounded =
                    Math.round(lumpSumChildPaymentNotRounded * 100) / 100;
                  let lumpSumChildPayment = lumpSumChildPaymentRounded.toFixed(2);
          
                  totalChildPayments += parseFloat(lumpSumChildPayment);
                } else {
                  totalChildPayments += currentChildPayment;
                }
                break;
              case 'two children':
                if (isLumpSumPayment) {
                  let lumpSumChildPaymentNotRounded = currentChildPayment * 0.5;
                  let lumpSumChildPaymentRounded =
                    Math.round(lumpSumChildPaymentNotRounded * 100) / 100;
                  let lumpSumChildPayment = lumpSumChildPaymentRounded.toFixed(2);
          
                  totalChildPayments += parseFloat(lumpSumChildPayment);
                } else {
                  totalChildPayments += currentChildPayment;
                }
                break;
              default:
                setAnnualChildSupport(null);
                return;
            }
          }

        let annualChildSupportNotRoundedHalf = (totalChildPayments / 6);
        let annualChildSupportRoundedHalf = Math.round(annualChildSupportNotRoundedHalf * 100) / 100;
        let annualChildSupportHalf = annualChildSupportRoundedHalf.toFixed(2);
        let annualChildSupportNotRounded = annualChildSupportHalf * 12;
        let annualChildSupportRounded = Math.round(annualChildSupportNotRounded * 100) / 100;
        let annualChildSupport = annualChildSupportRounded.toFixed(2);


        setAnnualChildSupport({
            annualChildSupport,
        });

        if (addToCurrentTotals) {
          const currentTotalUnparsed = localStorage.getItem('annualChildSupport');
          const currentTotal = parseFloat(currentTotalUnparsed) || 0;
          const newTotal = currentTotal + parseFloat(annualChildSupport);
          localStorage.setItem('annualChildSupport', newTotal);
          handleCalculatedIncome('childSupport', newTotal);

        } else {
          localStorage.setItem('annualChildSupport', annualChildSupport);
          handleCalculatedIncome('childSupport', annualChildSupport);
        }
    };

    const handleNumChildrenChange = (event) => {
        setNumChildren(event.target.value);
    };

    const handleClearAndReset = () => {

        setAddToCurrentTotals(false);

        setChildPayments([]);
        setIsLumpSum([]);
        setAnnualChildSupport(null);
        localStorage.removeItem('annualChildSupport');

        handleCalculatedIncome('childSupport', 0);

      };

    return (
      <div className="childsupport">
        <div className="childsupport__content">
          <div className="childsupport__input container-fluid text-center">
            <h2 className="childsupport__title fs-1 fw-bold">
              Child Support: Official
            </h2>
            <h3 className="childsupport__description fs-2 fw-semibold mb-3">
              For calculating Child Support payments that are court-mandated.
            </h3>
            <div className="border border-2 rounded p-2 mb-3">
              <label
              className="fs-4 fw-semibold mb-3"
              >
                Number of Children:
                <select value={numChildren} onChange={handleNumChildrenChange}>
                  <option value="one child">One Child</option>
                  <option value="two children">Two+ Children</option>
                </select>
              </label>

              {childPayments.map((childPayment, index) => (
                <div key={index} className="childsupport__input-container">
                  <label
                  className="fs-5 fw-bold mb-1"
                  >
                    Child Support Payment #{index + 1}:
                    <input
                      type="number"
                      min="0"
                      value={childPayment}
                      onChange={(event) =>
                        handleInputChange(index, event.target.value)
                      }
                    />
                  </label>
                  <label
                  className="childsupport__checkbox fw-normal fs-4 mb-3"
                  >
                    Is this a lump sum payment?
                    <input
                      type="checkbox"
                      checked={isLumpSum[index]}
                      onChange={(event) =>
                        handleLumpSumChange(index, event.target.checked)
                      }
                    />
                  </label>
                </div>
              ))}
              <div className="childsupport__buttons-container">
                <button
                  className="childsupport__button btn btn-light border border-3 border-success-subtle btn-lg me-3 mb-3"
                  onClick={handleaddChildPayment}
                >
                  Add CS Payment
                </button>
                <button
                  className="childsupport__button btn btn-light border border-3 border-danger btn-lg mb-3"
                  onClick={handleRemoveChildPayment}
                >
                  Remove CS Payment
                </button>
              </div>
              <label
              className="fs-4 fw-semibold"
              >
                Add to Current Totals: {' '}
                <input
                  type="checkbox"
                  checked={addToCurrentTotals}
                  onChange={() => setAddToCurrentTotals(!addToCurrentTotals)}
                />
              </label>
              <button
                className="btn btn-primary border border-dark btn-lg ms-3"
                onClick={calculateAnnualChildSupport}
              >
                Calculate Annual Child Support
              </button>
            </div>
          </div>
          <hr />
          <div className="childsupport__output container-fluid text-center">
            {annualChildSupport !== null && (
              <div className="childsupport__result-container">
                <p className="childsupport__result fs-5 mb-3">
                  Annual Child Support:{" "}
                  <strong>{annualChildSupport.annualChildSupport}</strong>
                </p>
                <button
                  className = "btn btn-danger btn-lg mb-3"
                  onClick={handleClearAndReset}
                >
                  Clear Child Support
                </button>
              </div>
            )}
            <Link to="/csquestion"
            className="btn btn-dark border border-secondary border-4 fs-5"
            >Back</Link>
          </div>
        </div>
      </div>
    );
    }

export default ChildSupport;