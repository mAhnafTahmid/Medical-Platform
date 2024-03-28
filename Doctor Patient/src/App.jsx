import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Home from './Home';
import Dashboard from './Dashboard';
import Appointments from './Appointments'; // Import the Appointments component

function App() {
  // Define your state or fetch data here
  const patientInfo = {
  
    // Add more patient info as needed
  };

  const appointments = [
    
    // Add more appointments as needed
  ];
  
  const handleDeleteAppointment = (index) => {
    // Implement your logic for deleting appointments
  };

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        
        <Route
          path='/dashboard'
          element={<Dashboard patientInfo={patientInfo} appointments={appointments} onDeleteAppointment={handleDeleteAppointment} />}
        />

        <Route path='/appointments' element={<Appointments />} /> {/* Route for Appointments page */}
      </Routes>
    </Router>
  );
}

export default App;
