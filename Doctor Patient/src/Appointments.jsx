import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  // Initialize appointments state as an empty array
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ doctor: '', department: '', time: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddAppointment = async () => {
    try {
      await axios.post('http://localhost:3055/api/appointments', newAppointment);
      console.log('hdfj')
      fetchAppointments(); // Fetch appointments after adding new appointment
      setNewAppointment({ doctor: '', department: '', time: '' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      fetchAppointments(); // Fetch appointments after deleting appointment
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div>
      <h2>Patient Appointments</h2>
      <div>
        <h3>Add Appointment</h3>
        <label>
          Doctor:
          <input type="text" name="doctor" value={newAppointment.doctor} onChange={handleInputChange} />
        </label>
        <label>
          Department:
          <input type="text" name="department" value={newAppointment.department} onChange={handleInputChange} />
        </label>
        <label>
          Time:
          <input type="text" name="time" value={newAppointment.time} onChange={handleInputChange} />
        </label>
        <button onClick={handleAddAppointment}>Add Appointment</button>
      </div>
      <div>
        <h3>Appointments</h3>
        <ul>
          {/* Ensure appointments is an array before mapping */}
          {Array.isArray(appointments) && appointments.map(appointment => (
            <li key={appointment._id}>
              <strong>Doctor:</strong> {appointment.doctor}<br />
              <strong>Department:</strong> {appointment.department}<br />
              <strong>Time:</strong> {appointment.time}<br />
              <button onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
