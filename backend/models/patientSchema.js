/// models/Patient.js
 
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true }
});

const Patient = mongoose.model('plist', patientSchema);

module.exports = Patient;
