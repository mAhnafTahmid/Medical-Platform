import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('email')
        navigate('/')
    }

  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300'>
        <Link to='/'><h1 className='text-3xl'>Medical Platform Website</h1></Link>
        <ul className='flex gap-6'>
            <Link to='/doctors'><li>Doctors</li></Link>
            {isUserSignedIn ? (
                <>
                    {role === 'doctor' && (
                        <Link to='/doctor/profile'><li>Doctor Profile</li></Link>
                    )}
                    {role === 'patient' && (
                        <Link to='/patient/profile'><li>Patient Profile</li></Link>
                    )}
                    {role === 'hospital' && (
                        <Link to='/hospital/profile'><li>Hospital Profile</li></Link>
                    )}
                    <li><button onClick={handleSignOut}>Sign Out</button></li>
                    <Link to='/delete'><li>Delete Account</li></Link>
                    <Link to='/password'><li>Change Password</li></Link>
                 </>
            ) : (
                <>
                <Link to='/doctor/login'><li>Login</li></Link>
                <Link to='/signup'><li>Signup</li></Link>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Header