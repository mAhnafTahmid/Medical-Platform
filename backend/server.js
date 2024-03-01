// import them (variables)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema'); // Corrected import statement

const SECRET_KEY = 'secretkey'

const app = express();

mongoose.connect('mongodb://localhost:27017/UserDB')
  .then(() => {
    app.listen(3001, () => {
      console.log('Server is running on port 3001 and MongoDB');
    });
  })
  .catch((error) => {
    console.log("Unable to connect");
  });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// USER registration
// POST registration 
// Post request and respond in JSON format
app.post('/register', async (req, res) => {
    try {
      const { email, password, speciality, time, qualification } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, speciality, time, qualification });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// GET all users
app.get('/register', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to get users' });
    }
});



//login (POST req)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
        res.json({ message: 'Login successful' })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
})



