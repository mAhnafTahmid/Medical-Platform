import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // Fetch user data from MongoDB
    axios.get('/api/users/profile')  // Change the endpoint to /api/users/profile
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);
  

  return (
    <Container>
      <Typography variant="h3">Patient Profile</Typography>
      {user ? (
        <div>
          
          <Typography variant="h5">Welcome to profile, {user.username}!</Typography>
          <Typography variant="body1">Name: {user.name}</Typography>
          <Typography variant="body1">Age: {user.age}</Typography>
          <Typography variant="body1">Gender: {user.gender}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
      
        </div>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      <Link to="/dashboard">Go to Dashboard</Link>
    </Container>
  );
};

export default Profile;
