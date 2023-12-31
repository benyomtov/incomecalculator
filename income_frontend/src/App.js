import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/PI/Landing/Landing';
import Paystubs from './components/PI/Paystubs/Paystubs';
import SelfEmployed from './components/PI/SelfEmployed/SelfEmployed';
import Eligibility from './components/Eligibility/Eligibility';
import SSDQuestion from './components/SSDQuestion/SSDQuestion';
import Other from './components/Other/Other';
import ChildSupport from './components/CS/ChildSupport/ChildSupport';
import CSQuestion from './components/CS/CSQuestion/CSQuestion';
import UnofficialCS from './components/CS/UnofficialCS/UnofficialCS';
import IncomeFromEmpVer from './components/PI/IncomeFromEmpVer/IncomeFromEmpVer';


import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Landing />} />
          <Route path="/paystubs" element={<Paystubs />} />
          <Route path="/childsupport" element={<ChildSupport />} />
          <Route path="/selfemployed" element={<SelfEmployed />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/csquestion" element={<CSQuestion />} />
          <Route path="/unofficialcs" element={<UnofficialCS />} />
          <Route path="/ssdquestion" element={<SSDQuestion />} />
          <Route path="/other" element={<Other />} />
          <Route path="/incomefromempver" element={<IncomeFromEmpVer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
