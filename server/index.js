const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const PatientModel = require('./models/patient');
//const PatientRoutes = require('./routes/patient');
const bcrypt = require('bcrypt')
const AppointmentModel = require('./models/appointment');
//const appointmentRoutes = require('./routes/appointments');

const app = express();
const router = express.Router(); // Define router here
app.use(express.json());
app.use(cors());

// Update your MongoDB connection string with your actual credentials
mongoose.connect("mongodb+srv://jitu:jitu84@cluster30.3poxuly.mongodb.net/?retryWrites=true&w=majority&appName=CLuster30", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  PatientModel.findOne({ email: email })
    .then(patient => {
      if (patient) {
        bcrypt.compare(password, patient.password, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json("Internal Server Error");
          }
          if (result) {
            res.json(patient);
          } else {
            res.json("Incorrect password");
          }
        });
      } else {
        res.json("User not found");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json("Internal Server Error");
    });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Internal Server Error");
    }

    PatientModel.create({ name, email, password: hash })
      .then(() => res.json("Registration successful"))
      .catch(err => {
        console.error(err);
        res.status(500).json("Internal Server Error");
      });
  });
});

// Update patient information route
router.put('/api/updatePatientInfo/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, gender } = req.body;

  try {
    // Find patient by ID and update their information
    const updatedPatient = await PatientModel.findByIdAndUpdate(id, { name, age, gender }, { new: true });
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient info:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





 


//appointment node
// Route to add a new appointment
router.post('/api/appointments', async (req, res) => {
  try {
    const { doctor, department, time } = req.body;
    console.log("hfjn")
    // Create a new appointment instance
    const newAppointment = new AppointmentModel({ doctor, department, time });
    // Save the new appointment to the database
    const savedAppointment = await newAppointment.save();
    // Send the saved appointment as the response
    res.json(savedAppointment);
  } catch (error) {
    console.error('Error adding appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

 

app.use(router); // Mount the router middleware

app.listen(3055, () => {
  console.log("Server is running on port 3055");
});
