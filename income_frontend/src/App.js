import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import SelfEmployed from './components/SelfEmployed/SelfEmployed';
import Paystubs from './components/Paystubs/Paystubs';
import ChildSupport from './components/ChildSupport/ChildSupport';
import Eligibility from './components/Eligibility/Eligibility';
import CSQuestion from './components/CSQuestion/CSQuestion';
import UnofficialCS from './components/UnofficialCS/UnofficialCS';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
