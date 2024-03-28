const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    gender: String
});

const PatientModel = mongoose.model("patient", PatientSchema, "patient");

module.exports = PatientModel;
//test



