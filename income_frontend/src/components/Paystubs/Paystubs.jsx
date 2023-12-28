import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Paystubs.css';

const Paystubs = () => {

    const [grossIncomes, setGrossIncomes] = useState(Array(1).fill(''));
    const [numOtherIncomes, setNumOtherIncomes] = useState(0);
    const [otherIncomes, setOtherIncomes] = useState(Array(numOtherIncomes).fill(''));
    const [payFrequency, setPayFrequency] = useState('monthly');
    const [result, setResult] = useState(null);

    const handlePayFrequencyChange = (event) => {
        setPayFrequency(event.target.value);

        switch (event.target.value) {
            case 'monthly':
            setGrossIncomes(Array(1).fill(''));
            break;
            case 'semi-monthly':
            case 'bi-weekly':
            setGrossIncomes(Array(2).fill(''));
            break;
            case 'weekly':
            setGrossIncomes(Array(4).fill(''));
            break;
            default:
                setGrossIncomes([]);   
                break; 
        }
    };

    const handleInputChange = (index, value, isOtherIncome = false) => {
        if(isOtherIncome) {
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
        const newNumOtherIncomes = parseInt(event.target.value, 10);
        setNumOtherIncomes(newNumOtherIncomes);
        setOtherIncomes(Array(newNumOtherIncomes).fill(''));
    };

    const calculateAnnualIncome = () => {
        const parsedGrossIncomes = grossIncomes.map((grossIncome) => parseFloat(grossIncome));
        const parsedOtherIncomes = otherIncomes.map((otherIncome) => parseFloat(otherIncome));

        if (parsedGrossIncomes.some((isNaN) || 
            parsedOtherIncomes.some(isNaN) || 
            parsedGrossIncomes.length === 0)) {
            setResult({

                annualIncome: 'Invalid Input',
                averageGrossIncome: 'Invalid Input',
            });
            return;
        }

        const averageGrossIncomeNotRounded = (parsedGrossIncomes.reduce((acc, income) => acc + income, 0) / parsedGrossIncomes.length);
        const averageGrossIncomePartiallyRounded = Math.round(averageGrossIncomeNotRounded * 100) / 100;
        const averageGrossIncome = averageGrossIncomePartiallyRounded.toFixed(2);

        let annualIncomeNotRounded;
        let annualIncomePartiallyRounded;
        let annualIncomeRounded;
        let annualIncome;
        let totalOtherIncome;

        switch (payFrequency) {
            case 'monthly':
                annualIncomeNotRounded = (averageGrossIncome * 12);
                annualIncomePartiallyRounded = Math.round(annualIncomeNotRounded * 100) / 100;
                annualIncomeRounded = annualIncomePartiallyRounded.toFixed(2);
                totalOtherIncome = parsedOtherIncomes.reduce((acc, income) => acc + income, 0);
                annualIncome = parseFloat(annualIncomeRounded) + parseFloat(totalOtherIncome);
                break;
            case 'semi-monthly':
                annualIncomeNotRounded = (averageGrossIncome * 24);
                annualIncomePartiallyRounded = Math.round(annualIncomeNotRounded * 100) / 100;
                annualIncomeRounded = annualIncomePartiallyRounded.toFixed(2);
                totalOtherIncome = parsedOtherIncomes.reduce((acc, income) => acc + income, 0);
                annualIncome = parseFloat(annualIncomeRounded) + parseFloat(totalOtherIncome);
                break;
            case 'bi-weekly':
                annualIncomeNotRounded = (averageGrossIncome * 26);
                annualIncomePartiallyRounded = Math.round(annualIncomeNotRounded * 100) / 100;
                annualIncomeRounded = annualIncomePartiallyRounded.toFixed(2);
                totalOtherIncome = parsedOtherIncomes.reduce((acc, income) => acc + income, 0);
                annualIncome = parseFloat(annualIncomeRounded) + parseFloat(totalOtherIncome);
                break;
            case 'weekly':
                annualIncomeNotRounded = (averageGrossIncome * 52);
                annualIncomePartiallyRounded = Math.round(annualIncomeNotRounded * 100) / 100;
                annualIncomeRounded = annualIncomePartiallyRounded.toFixed(2);
                totalOtherIncome = parsedOtherIncomes.reduce((acc, income) => acc + income, 0);
                annualIncome = parseFloat(annualIncomeRounded) + parseFloat(totalOtherIncome);
                break;
            default:
                setResult(null);
                return;
        }

        


        setResult({
            annualIncome,
            annualIncomeRounded,
            averageGrossIncome,
            totalOtherIncome,
        })


    };

    return (
        <div className="paystubs">
        <div className="paystubs__content">
            <h1 className="paystubs__title">Paystubs</h1>
            <p className="paystubs__description">Calculate Paystubs</p>

            <label>
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
                    <label>
                        Gross Income #{index + 1}:
                        <input
                            type="number"
                            value={grossIncome}
                            onChange={(event) => handleInputChange(index, event.target.value)}
                            placeholder={`Enter Gross Income #${index + 1}`}
                        />

                    </label>
                </div>
            ))}

            <label>
                Select Number of Other Incomes:
                <input type="number" 
                        value={numOtherIncomes} 
                        onChange={handleNumOtherIncomesChange}
                        placeholder="Enter Number of Other Incomes"
                        />
            </label>

            {otherIncomes.map((otherIncome, index) => (
                <div key={index}>
                    <label>
                        Other Income #{index + 1}:
                        <input
                            type="number"
                            value={otherIncome}
                            onChange={(event) => handleInputChange(index, event.target.value, true)}
                            placeholder={`Enter Other Income #${index + 1}`}
                        />

                    </label>
                </div>
            ))}

            <button onClick={calculateAnnualIncome}>Calculate</button>


            {result && (
                <div className="paystubs__result">
                    <p>
                        Average Gross Income: <strong>{result.averageGrossIncome}</strong>
                    </p>
                    <p>
                        Total Other Income: <strong>{result.totalOtherIncome}</strong>
                    </p>
                    <p>
                        Annual Income: <strong>{result.annualIncomeRounded}</strong>
                    </p>
                    <p>
                        Annual Income Plus Other: <strong>{result.annualIncome}</strong>
                    </p>
                   
                </div>
            )}

            <Link to="/" >Back</Link>

        </div>
        </div>
    );
    }

export default Paystubs;