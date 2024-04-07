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
import HospitalLogin from './pages/HospitalLogin';
import HospitalSignUp from './pages/HospitalSignup';
import HospitalView from './pages/HospitalView';
import PatientSignup from './pages/PatientSignup';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/department" element={<Department />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/signup" element={<PatientSignup/>} />
          <Route path="/hospital/profile" element={<HospitalProfile />} />
          <Route path="/doctor/signup/:email" element={<DoctorSignUp />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/hospital/signup" element={<HospitalSignUp />} />
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/view/:email" element={<HospitalView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

