import React, { useState } from 'react';
import './ChildSupport.css';
import { Link } from 'react-router-dom';

const ChildSupport = () => {

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
        localStorage.setItem('annualChildSupport', annualChildSupport);
    };

    const handleNumChildrenChange = (event) => {
        setNumChildren(event.target.value);
    };

    const handleClearAndReset = () => {
        setChildPayments([]);
        setIsLumpSum([]);
        setAnnualChildSupport(null);
        localStorage.removeItem('annualChildSupport');
      };

    return (
      <div className="childsupport">
        <div className="childsupport__content">
          <h1 className="childsupport__title">Child Support: Official</h1>
          <p className="childsupport__description">For calculating Child Support payments that are court-mandated.</p>

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
                Child Support Payment #{index + 1}:
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
                <button className="childsupport__button" onClick={handleaddChildPayment}>Add Child Support Payment</button>
                <button className="childsupport__button" onClick={handleRemoveChildPayment}>Remove Child Support Payment</button>
                <button className="childsupport__button" onClick={calculateAnnualChildSupport}>Calculate Annual Child Support</button>
            </div>
            {annualChildSupport !== null && (
                <div className="childsupport__result-container">
                    <p className="childsupport__result">
                            Annual Child Support: 
                            <strong>
                                {annualChildSupport.annualChildSupport}
                            </strong>     
                    </p>
                    <button className="childsupport__button" onClick={handleClearAndReset}>Clear Child Support</button>
                </div>
            )}
            <Link to="/csquestion">Back</Link>
        </div>
      </div>
    );
    }

export default ChildSupport;