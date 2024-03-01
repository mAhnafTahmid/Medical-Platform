import React from 'react';
import { Link } from 'react-router-dom';

function Account() {
  return (
    <div className='w-full h-screen bg-[#1a1a1a] text-white flex justify-center items-center'>
      <div className='w-[600px]'>
        <h2 className='text-3xl mb-6'>Account</h2>
       
        <Link to="/prescriptionForm">
          <button className='w-full bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded'>
            Write Prescription
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Account;
