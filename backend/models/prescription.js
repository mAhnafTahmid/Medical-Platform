const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
