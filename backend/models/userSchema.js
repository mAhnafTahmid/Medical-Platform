const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  speciality: { type: String, required: true },
  time: { type: String, required: true },
  password: { type: String, required: true },
  qualification: { type: String, required: true },
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pres' }] // Reference to prescriptions
});


const User = mongoose.model('Users', userSchema);


module.exports = User;
