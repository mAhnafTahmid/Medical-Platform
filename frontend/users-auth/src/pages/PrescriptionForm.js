
import React, { useState } from 'react';
import axios from 'axios';

function PrescriptionForm() {
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [prescription, setPrescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/prescription', {
                patientName,
                patientEmail,
                prescription
            });
            alert('Prescription submitted successfully!');
            setPatientName('');
            setPatientEmail('');
            setPrescription('');
        } catch (error) {
            console.error('Error submitting prescription:', error);
        }
    };
    

    return (
        <div className="prescription-form-container">
            <h2>Prescription Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="patientName">Patient Name:</label>
                    <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="patientEmail">Patient Email:</label>
                    <input type="email" id="patientEmail" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="prescription">Prescription:</label>
                    <textarea id="prescription" value={prescription} onChange={(e) => setPrescription(e.target.value)} />
                </div>
                <button type="submit">Submit Prescription</button>
            </form>
        </div>
    );
}

export default PrescriptionForm;
