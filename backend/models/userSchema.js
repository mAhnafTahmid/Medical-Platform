const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    email: { type: String, required: true },
    speciality: { type: String, required: true},
    time: {type: String,required: true},
    password: { type: String, required: true },
    qualification: { type: String, required: true }
 })

 //all the shema and put in a var egg in the buket
const User =mongoose.model('Users',userSchema);



// to use it somewhere else
module.exports =User