// appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    phone: String,
    address: String,
    weight: Number,
    doctor_name: String,
    appointment_time: Date
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
