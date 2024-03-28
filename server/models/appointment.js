const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  time: { type: String, required: true },
  department: { type: String, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
