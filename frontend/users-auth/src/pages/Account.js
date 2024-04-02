import React from 'react';
import { Link } from 'react-router-dom';

function Account({name, email, speciality, time, qualification }) {
  return (
    <div className='w-full h-screen bg-gray-400 text-white flex justify-center items-center'>
      <div className='w-[600px]'>
        <h2 className='text-4xl mb-6 items-center'>Profile</h2>

        <div className='bg-white rounded p-4 mb-4'>
        <p><strong style={{ color: 'black' }}>Name:</strong> {name}</p>
          <p><strong style={{ color: 'black' }}>Email:</strong> {email}</p>
          <p><strong style={{ color: 'black' }}>Speciality:</strong> {speciality}</p>
          <p><strong style={{ color: 'black' }}>Time:</strong> {time}</p>
          <p><strong style={{ color: 'black' }}>Qualification:</strong> {qualification}</p>
        </div>

        <Link to="/PrescriptionForm">
          <button className='w-full bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mb-4'>
            Write Prescription
          </button>
        </Link>

        <Link to="/PatientList">
          <button className='w-full bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded'>
            PatientList
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Account;
