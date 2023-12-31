import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UnofficialCS.css';

const UnofficialCS = () => {

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
                localStorage.setItem('annualChildSupport', annualChildSupport);
                break;
            case 'biweekly':
                const biweeklyChildSupportNotRounded = parsedChildSupportAmount * 2.167;
                const biweeklyChildSupportPartiallyRounded = Math.round(biweeklyChildSupportNotRounded * 100) / 100;
                const biweeklyChildSupport = biweeklyChildSupportPartiallyRounded.toFixed(2);
                const annualChildSupportNotRounded2 = biweeklyChildSupport * 12;
                const annualChildSupportPartiallyRounded2 = Math.round(annualChildSupportNotRounded2 * 100) / 100;
                let annualChildSupport2 = annualChildSupportPartiallyRounded2.toFixed(2);
                setAnnualChildSupport(annualChildSupport2);
                localStorage.setItem('annualChildSupport', annualChildSupport2);
                break;
            case 'monthly':
                const monthlyChildSupportNotRounded = parsedChildSupportAmount * 12;
                const monthlyChildSupportPartiallyRounded = Math.round(monthlyChildSupportNotRounded * 100) / 100;
                let monthlyChildSupport = monthlyChildSupportPartiallyRounded.toFixed(2);
                setAnnualChildSupport(monthlyChildSupport);
                localStorage.setItem('annualChildSupport', monthlyChildSupport);
                break;
                default:
                    setAnnualChildSupport(null);
        }
    };

    const handleClearAndReset = () => {
        // Clear annualChildSupport in localStorage
        localStorage.removeItem('annualChildSupport');
        
        // Reset component state
        setChildSupportAmount('');
        setFrequency('weekly');
        setAnnualChildSupport(null);
      };


    return (
        <div className="unofficialCS">
            <div className="unofficialCS__content">
                <h1 className="unofficialCS__title">Child Support: Unofficial</h1>
                <p className="unofficialCS__description">For calculating unofficial Child Support agreements between parents.</p>
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
                        Annual Child Support: <strong>{annualChildSupport}</strong>
                    </p>
                    <button onClick={handleClearAndReset}>Clear Child Support</button>
                    </div>
                )}
            <Link to="/csquestion">Back</Link>
            </div>
        </div>
    );
}

export default UnofficialCS;