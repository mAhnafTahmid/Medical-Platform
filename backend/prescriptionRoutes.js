const express = require('express');
const router = express.Router();
const Prescription = require('../models/prescription');

// Create a prescription
router.post('/', async (req, res) => {
    try {
        const { patientName, patientEmail, prescription } = req.body;
        const newPrescription = new Prescription({
            patientName,
            patientEmail,
            prescription
        });
        await newPrescription.save();
        res.status(201).json(newPrescription);
    } catch (error) {
        console.error('Error creating prescription:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
