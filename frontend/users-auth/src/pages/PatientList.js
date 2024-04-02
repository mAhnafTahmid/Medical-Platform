import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/PatientList')
      .then(response => {
        if (Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          console.error('Error fetching patients: Data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  return (
    <div className="PatientList">
      <h1>Patient List</h1>
      <ul>
        {patients.map(patient => (
          <li key={patient._id} style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ backgroundColor: 'blue', color: 'white', marginBottom: '5px', padding: '5px' }}>
              <strong>Name:</strong> {patient.name}
            </div>
            <div style={{ backgroundColor: 'blue', color: 'white', padding: '5px' }}>
              <strong>Date:</strong> {new Date(patient.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
