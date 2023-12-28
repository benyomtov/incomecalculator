import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayIncomes from '../DisplayIncomes/DisplayIncomes';
import './UnofficialCS.css';

const UnofficialCS = () => {

    const navigate = useNavigate();

    const [frequency, setFrequency] = useState('weekly');
    const [childSupportAmount, setChildSupportAmount] = useState('');
    const [annualChildSupport, setAnnualChildSupport] = useState(null);

    const handleFrequencyChange = (event) => {
        setFrequency(event.target.value);
    };

    const handleChildSupportAmountChange = (event) => {
        setChildSupportAmount(event.target.value);
    };

    const calculateAnnualChildSupport = () => {

        if (isNaN(childSupportAmount) || !childSupportAmount) {

            setAnnualChildSupport({
                annualChildSupport: 'Invalid Input',
            });
            return;
        }

        const parsedChildSupportAmount = parseFloat(childSupportAmount);

        switch (frequency) {
            case 'weekly':
                const weeklyChildSupportNotRounded = parsedChildSupportAmount * 4.333;
                const weeklyChildSupportPartiallyRounded = Math.round(weeklyChildSupportNotRounded * 100) / 100;
                const weeklyChildSupport = weeklyChildSupportPartiallyRounded.toFixed(2);
                const annualChildSupportNotRounded = weeklyChildSupport * 12;
                const annualChildSupportPartiallyRounded = Math.round(annualChildSupportNotRounded * 100) / 100;
                let annualChildSupport = annualChildSupportPartiallyRounded.toFixed(2);
                setAnnualChildSupport(annualChildSupport);
                break;
            case 'biweekly':
                const biweeklyChildSupportNotRounded = parsedChildSupportAmount * 2.167;
                const biweeklyChildSupportPartiallyRounded = Math.round(biweeklyChildSupportNotRounded * 100) / 100;
                const biweeklyChildSupport = biweeklyChildSupportPartiallyRounded.toFixed(2);
                const annualChildSupportNotRounded2 = biweeklyChildSupport * 12;
                const annualChildSupportPartiallyRounded2 = Math.round(annualChildSupportNotRounded2 * 100) / 100;
                let annualChildSupport2 = annualChildSupportPartiallyRounded2.toFixed(2);
                setAnnualChildSupport(annualChildSupport2);
                break;
            case 'monthly':
                const monthlyChildSupportNotRounded = parsedChildSupportAmount * 12;
                const monthlyChildSupportPartiallyRounded = Math.round(monthlyChildSupportNotRounded * 100) / 100;
                let monthlyChildSupport = monthlyChildSupportPartiallyRounded.toFixed(2);
                setAnnualChildSupport(monthlyChildSupport);
                break;
                default:
                    setAnnualChildSupport(null);
        }
    };

    const handleSaveandContinue = () => {
        if (annualChildSupport !== null) {
            localStorage.setItem('annualChildSupport', annualChildSupport);
            navigate('/ssdquestion');
        }

    };


    const handleClearAndReset = () => {
        // Clear annualChildSupport in localStorage
        localStorage.removeItem('annualChildSupport');
        
        // Reset component state
        setChildSupportAmount('');
        setAnnualChildSupport(null);
      };


    return (
        <div className="unofficialCS">
            <div className="unofficialCS__content">
                <h1 className="unofficialCS__title">Unofficial Child Support</h1>
                <p className="unofficialCS__description">Calculate Unofficial Child Support</p>
                <label>
                    Frequency:
                    <select
                        value={frequency}
                        onChange={handleFrequencyChange}
                    >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Biweekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </label>
                <label>
                    Child Support Amount:
                    <input
                        type="number"
                        value={childSupportAmount}
                        onChange={handleChildSupportAmountChange}
                    />
                </label>
                <button onClick={calculateAnnualChildSupport}>Calculate</button>
                {annualChildSupport !== null && (
                    <div>
                    <p>
                        Annual Child Support: <strong>${annualChildSupport}</strong>
                    </p>
                    <button onClick={handleSaveandContinue}>Save and Continue</button>
                    <button onClick={handleClearAndReset}>Clear Child Support</button>
                    </div>
                )}
                <Link to="/">Back</Link>
                <Link to="/ssdquestion">Next</Link>
                <Link to="/eligibility">Eligibility</Link>
            </div>

            <DisplayIncomes />
        </div>
    );
}

export default UnofficialCS;