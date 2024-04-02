const express = require('express');
const mongoose = require('mongoose');
const Patient = require('./models/patientSchema');

const app = express();
const PORT = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UserDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Route to handle /PatientList endpoint
app.get('/PatientList', async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.send({ status: "ok", data: patients });
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
