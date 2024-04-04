import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HospitalProfile from './pages/HospitalProfile';
import Department from './pages/Department';
import PatientProfile from './pages/PatientProfile';
import HomePage from './pages/HomePage';
import DoctorSignUp from './pages/DoctorSignUp';
import DoctorLogin from './pages/DoctorLogin';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/department" element={<Department />} />
          <Route path="/patient" element={<PatientProfile />} />
          <Route path="/hospital" element={<HospitalProfile />} />
          <Route path="/doctor/signup" element={<DoctorSignUp />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

