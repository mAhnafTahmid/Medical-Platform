import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [hospital, setHospital] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3055/doctor/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNo,
                    specialty,
                    hospital,
                    password, 
                    pdfs: []
                })
            });

            if (response.ok) {
                alert('Registration Successful');
                setName('');
                setEmail('');
                setPhoneNo('');
                setSpecialty('');
                setHospital('');
                setPassword('');
                navigate('/login');
            } else {
                console.log('Unable to register user');
            }
        } catch (error) {
            console.error('Unable to connect to the server:', error);
        }
    };

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-[90%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form className='text-center border rounded-lg w-[600px] h-[600px] p-9' onSubmit={handleRegister}>
                    <label>Name</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Name'
                        value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                    <label>Email</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Email'
                        value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                    <label>Phone Number</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Phone Number'
                        value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} /><br /><br />
                    <label>Specialty</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Specialty'
                        value={specialty} onChange={(e) => setSpecialty(e.target.value)} /><br /><br />
                    <label>Hospital</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Hospital'
                        value={hospital} onChange={(e) => setHospital(e.target.value)} /><br /><br />
                    <label>Password</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='password' placeholder='Password'
                        value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                    <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>Sign Up</button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
                <h2 className='text-3xl text-white'>Sign Up</h2>
            </div>
        </div>
    );
}

export default SignUp;
