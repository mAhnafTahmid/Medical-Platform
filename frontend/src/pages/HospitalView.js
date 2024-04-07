import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HospitalView = () => {
    const [hospitalDetails, setHospitalDetails] = useState(null);
    const { email } = useParams();
    const navigate = useNavigate();
  
    // Get the patient email from local storage or set it to an empty string if not found
    const patientEmail = localStorage.getItem('email') || '';
    const role = localStorage.getItem('role')
  
    const [formData, setFormData] = useState({
      patientName: '',
      patientEmail: patientEmail,
      selectedDepartment: '',
      selectedDoctor: '',
      hospitalEmail: email,
    });
  
    useEffect(() => {
      const fetchHospitalData = async () => {
        try {
          const response = await fetch(`http://localhost:3055/hospital/${email}`, {
              method: 'GET',
            });
          if (response.ok) {
            const data = await response.json();
            setHospitalDetails(data);
          } else {
            console.error('Failed to fetch hospital data');
          }
        } catch (error) {
          console.error('Error fetching hospital data:', error);
        }
      };
  
      fetchHospitalData();
    }, [email]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (role !== 'patient') {
        navigate('/doctor/login')
        window.location.reload();
      }
      try {
        // Send formData to backend
        const response = await fetch('http://localhost:3055/hospital/appoinment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          // Handle success
          console.log('Appointment successfully made');
        } else {
          console.error('Failed to make appointment');
        }
      } catch (error) {
        console.error('Error making appointment:', error);
      }
    };
  
    if (!hospitalDetails) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
        {/* Left side - Hospital Details */}
        <div className="flex-2 bg-gray-200 p-4">
          <h2 className="text-2xl font-semibold mb-4">Hospital Details</h2>
          <div>
              <p><strong>Name:</strong> {hospitalDetails.name}</p>
              <p><strong>Email:</strong> {hospitalDetails.email}</p>
              <p><strong>Phone Number:</strong> {hospitalDetails.phoneNo}</p>
              <p><strong>City:</strong> {hospitalDetails.city}</p>
              <p><strong>Area:</strong> {hospitalDetails.area}</p>
              <p><strong>Address:</strong> {hospitalDetails.address}</p>
              <p><strong>Description:</strong> {hospitalDetails.description}</p>
          </div>
          {/* Display hospital details here */}
        </div>
  
        {/* Right side - Appointment Form */}
        <div className="flex-1 bg-gray-100 p-4">
          <h2 className="text-2xl font-semibold mb-4">Make an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                Patient Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="patientName"
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Remove patient email input field */}
            {/* Use the value from local storage instead */}
            <input
              type="hidden"
              name="patientEmail"
              value={formData.patientEmail}
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                Select Department
              </label>
              <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="department"
                  name="selectedDepartment"
                  value={formData.selectedDepartment}
                  onChange={handleInputChange}
                  required
                  >
                  <option value="">Select Department</option>
                  {Object.keys(hospitalDetails.departments).map((departmentName, index) => (
                      <option key={index} value={departmentName}>{departmentName}</option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor">
                Select Doctor
              </label>
              <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="doctor"
                  name="selectedDoctor"
                  value={formData.selectedDoctor}
                  onChange={handleInputChange}
                  required
                  >
                  <option value="">Select Doctor</option>
                  {Object.keys(hospitalDetails.departments).map((departmentName, index) => (
                      <optgroup key={index} label={departmentName}>
                      {hospitalDetails.departments[departmentName].map((doctor, idx) => (
                          <option key={idx} value={doctor}>{doctor}</option>
                      ))}
                      </optgroup>
                  ))}
              </select>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Make Appointment
            </button>
          </form>
        </div>
      </>
    );
  };
  
  export default HospitalView;
  