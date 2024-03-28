import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component

const Dashboard = ({ patientInfo, onUpdatePatientInfo }) => {
  const [localPatientInfo, setLocalPatientInfo] = useState(patientInfo);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    setLocalPatientInfo(patientInfo);
  }, [patientInfo]);

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id: patientId } = localPatientInfo; // Extract patientId from localPatientInfo
      const response = await axios.put(`/api/updatePatientInfo/${patientId}`, updatedInfo);
      setLocalPatientInfo(response.data);
      setShowUpdateForm(false);
      onUpdatePatientInfo(response.data);
    } catch (error) {
      console.error('Error updating patient info:', error);
    }
  };

  return (
    <div>
      <h2>Patient Dashboard</h2>

      <section>
        <h3>Patient Information</h3>
        <div>
          <p>Name: {localPatientInfo.name}</p>
          <p>Age: {localPatientInfo.age}</p>
          <p>Gender: {localPatientInfo.gender}</p>
          <button type="button" onClick={handleUpdate}>Update</button>
        </div>
      </section>

      {/* Update form */}
      {showUpdateForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={updatedInfo.name} onChange={handleChange} />
          </label>
          <label>
            Age:
            <input type="text" name="age" value={updatedInfo.age} onChange={handleChange} />
          </label>
          <label>
            Gender:
            <input type="text" name="gender" value={updatedInfo.gender} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Link to Appointments page */}
      <Link to="/appointments">Go to Appointments</Link>
    </div>
  );
};

export default Dashboard;
