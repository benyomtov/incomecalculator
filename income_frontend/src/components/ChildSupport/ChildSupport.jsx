import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayIncomes from '../DisplayIncomes/DisplayIncomes';
import './ChildSupport.css';

const ChildSupport = () => {

    const navigate = useNavigate();

    const [childPayments, setChildPayments] = useState([]);
    const [numChildren, setNumChildren] = useState('one child');
    const [isLumpSum, setIsLumpSum] = useState([]);
    const [annualChildSupport, setAnnualChildSupport] = useState(null);

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

    const handleRemoveChildPayment = (index) => {
        const newChildPayments = [...childPayments];
        newChildPayments.splice(index, 1);
        setChildPayments(newChildPayments);

        const newIsLumpSum = [...isLumpSum];
        newIsLumpSum.splice(index, 1);
        setIsLumpSum(newIsLumpSum);
    };

    const calculateAnnualChildSupport = () => {

        const parsedChildPayments = childPayments.map((childPayment) => parseFloat(childPayment));

        if (parsedChildPayments.some(isNaN) 
        || parsedChildPayments.length === 0
        || isLumpSum.length !== parsedChildPayments.length) {

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
    };

    const handleNumChildrenChange = (event) => {
        setNumChildren(event.target.value);
    };

    const handleSaveandContinue = () => {
        if (annualChildSupport !== null) {
            localStorage.setItem('annualChildSupport', annualChildSupport.annualChildSupport);
            navigate('/ssdquestion');
        }

    };

    const handleClearAndReset = () => {
        setChildPayments([]);
        setIsLumpSum([]);
        setAnnualChildSupport(null);
      };

    return (
      <div className="childsupport">
        <div className="childsupport__content">
          <h1 className="childsupport__title">Child Support</h1>
          <p className="childsupport__description">Calculate Child Support</p>

          <label>
            Number of Children:
            <select
                value={numChildren}
                onChange={handleNumChildrenChange}
            >
                <option value="one child">One Child</option>
                <option value="two children">Two Children</option>
            </select>
          </label>

          {childPayments.map((childPayment, index) => (
            <div key={index} className="childsupport__input-container">
              <label>
                Child Support #{index + 1}:
                <input
                  type="number"
                  value={childPayment}
                  onChange={(event) =>
                    handleInputChange(index, event.target.value)
                  }
                />
              </label>
                <label>
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
                <button className="childsupport__button" onClick={handleaddChildPayment}>Add Child Support</button>
                <button className="childsupport__button" onClick={handleRemoveChildPayment}>Remove Child Support</button>
                <button className="childsupport__button" onClick={calculateAnnualChildSupport}>Calculate Annual Child Support</button>
            </div>
            {annualChildSupport !== null && (
                <div className="childsupport__result-container">
                    <p className="childsupport__result">
                            Annual Child Support: 
                            <strong>
                                {annualChildSupport.annualChildSupport}
                            </strong>
                            <button className="childsupport__button" onClick={handleSaveandContinue}>Save and Continue</button>     
                    </p>
                    <button className="childsupport__button" onClick={handleClearAndReset}>Clear Child Support</button>
                </div>
            )}

          <Link to="/csquestion">Back</Link>
          <Link to="/ssdquestion">Next</Link>
          <Link to="/">Home</Link>
          <Link to="/eligibility">Eligibility</Link>
        </div>

        <DisplayIncomes />
      </div>
    );
    }

export default ChildSupport;