import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle your registration logic here using name, email, password, age, and gender
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Age:', age);
    console.log('Gender:', gender);

    // Make a POST request to your registration endpoint
    axios.post('http://localhost:3055/register', { name, email, password, age, gender })
      .then(result => {
        console.log(result);
        // Redirect to the home page after successful registration
        navigate('/home');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2> Patient Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age">
              <strong>Age</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Age"
              autoComplete="off"
              name="age"
              className="form-control rounded-0"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gender">
              <strong>Gender</strong>
            </label>
            <select
              className="form-control rounded-0"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        <p>Already have an account</p>
        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
