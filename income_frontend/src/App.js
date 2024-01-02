import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/PI/Landing/Landing';
import Paystubs from './components/PI/Paystubs/Paystubs';
import SelfEmployed from './components/PI/SelfEmployed/SelfEmployed';
import Eligibility from './components/Eligibility/Eligibility';
import SSDQuestion from './components/SSDQuestion/SSDQuestion';
import Other from './components/Other/Other';
import ChildSupport from './components/CS/ChildSupport/ChildSupport';
import IncomeFromEmpVer from './components/PI/IncomeFromEmpVer/IncomeFromEmpVer';
import CSQuestion from './components/CS/CSQuestion/CSQuestion';
import UnofficialCS from './components/CS/UnofficialCS/UnofficialCS';

import './App.css';

function App() {

  const [selectedOption, setSelectedOption] = useState('primaryIncome');
  const [calculatedIncome, setCalculatedIncome] = useState({
    primaryIncome: 0,
    childSupport: 0,
    ssd: 0,
    other: 0,
  });

  const handleNavbarClick = (option) => {
    setSelectedOption(option);
  };

  const handleCalculatedIncome = (option, value) => {
    setCalculatedIncome((prevIncome) => ({
      ...prevIncome,
      [option]: value,
    }));
  };

  return (
    <div className="App m-3">
      <Router>
        <Navbar handleNavbarClick={handleNavbarClick} />

        <div className="content-container container-fluid row justify-content-center">
          <div className="left-content col-6 border border-3 rounded border-primary-subtle p-2">
            <Routes>
              <Route path="/*" element={<Landing />} />
              <Route path="/paystubs" element={<Paystubs handleCalculatedIncome={handleCalculatedIncome} />} />
              <Route path="/csquestion" element={<CSQuestion />} />
              <Route path="/childsupport" element={<ChildSupport handleCalculatedIncome={handleCalculatedIncome} />} />
              <Route path ="/unofficialcs" element={<UnofficialCS handleCalculatedIncome={handleCalculatedIncome} />} />
              <Route path="/selfemployed" element={<SelfEmployed handleCalculatedIncome={handleCalculatedIncome} />} />
              <Route path="/ssdquestion" element={<SSDQuestion handleCalculatedIncome={handleCalculatedIncome} />} />
              <Route path="/other" element={<Other handleCalculatedIncome={handleCalculatedIncome} />} />
              <Route path="/incomefromempver" element={<IncomeFromEmpVer handleCalculatedIncome={handleCalculatedIncome} />} />
            </Routes>
          </div>
          
          <div className="right-content col-5">
            <Eligibility calculatedIncome={calculatedIncome} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;