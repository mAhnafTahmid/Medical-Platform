import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HospitalProfile from './pages/HospitalProfile';
import Department from './pages/Department';
import PatientProfile from './pages/PatientProfile';
import HomePage from './pages/HomePage';
import DoctorSignUp from './pages/DoctorSignUp';
import DoctorLogin from './pages/DoctorLogin';
import DoctorProfile from './pages/DoctorProfile';
import Header from './pages/Header';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/department" element={<Department />} />
          <Route path="/patient" element={<PatientProfile />} />
          <Route path="/hospital" element={<HospitalProfile />} />
          <Route path="/doctor/signup" element={<DoctorSignUp />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/profile/:email" element={<DoctorProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

