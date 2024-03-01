import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [time, setTime] = useState('');
    const [qualification, setQualification] = useState('');
    const navigate = useNavigate(); // Add this line

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
             console.log(res.data);
        });
    };

    const handleRegister = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/register', { email, password, speciality, time, qualification })
        .then(() => {
            alert('Registration Successful');
            setEmail('');
            setPassword('');
            setSpeciality('');
            setTime('');
            setQualification('');
            fetchUsers();
            navigate('/login');
        })
        .catch((error) => {
            console.log('Unable to register user');
        });
    };

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-[90%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form className='text-center border rounded-lg w-[600px] h-[600px] p-9'
                onSubmit={handleRegister}>
                    {/* Email Input */}
                    <label>Email</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <br />
                     {/* Speciality Input */}
                     <label>Speciality</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                    type='text'
                    placeholder='Speciality'
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)} />
                    <br />
                    <br />
                    {/* Time Input */}
                    <label>Time</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                    type='text'
                    placeholder='Time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)} />
                    <br />
                    <br />
                    {/* Qualification Input */}
                    <label>Qualification</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                    type='text'
                    placeholder='Qualification'
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)} />
                    <br />
                    <br />
                    {/* Password Input */}
                    <label>Password</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <br />
                    {/* Button */}
                    <button className='w-[200px] h-[50px] border hover:bg-teal-900'
                    type='submit'>Sign Up</button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
                <h2 className='text-3xl text-white'>Sign Up</h2>
            </div>
        </div>
      );
}

export default SignUp;
