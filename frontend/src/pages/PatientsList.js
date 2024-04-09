import React, { useState, useEffect } from 'react';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetch(`http://localhost:3055/doctor/patients/${email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const extractedPatients = [];
        const doctor = findDoctorByEmail(data.departments, email);
        if (doctor) {
          for (const appointment of doctor.appointments) {
            extractedPatients.push({ name: appointment[0] });
          }
          setPatients(extractedPatients);
        } else {
          console.error('Error fetching patients: Doctor not found for email:', email);
        }
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, [email]);

  const currentDate = new Date().toLocaleDateString();

  // Function to find doctor by email in the departments
  const findDoctorByEmail = (departments, email) => {
    for (const department of departments.values()) {
      for (const doctor of department) {
        if (doctor.email === email) {
          return doctor;
        }
      }
    }
    return null;
  };

  return (
    <div className="PatientList">
      <h1>Patient List</h1>
      <p>Current Date: {currentDate}</p>
      <ul>
        {patients.map((patient, index) => (
          <li key={index} style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ backgroundColor: 'blue', color: 'white', marginBottom: '5px', padding: '5px' }}>
              <strong>Name:</strong> {patient.name}
            </div>
            <div style={{ backgroundColor: 'blue', color: 'white', padding: '5px' }}>
              <strong>Date:</strong> {currentDate}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
