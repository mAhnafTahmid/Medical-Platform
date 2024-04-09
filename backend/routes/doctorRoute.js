import express from "express";
const doctorRouter = express.Router()
import { removeDoctor, createDoctor, registerDoctor, getDoctorByEmail, loginAll, deleteAccount, sendPrescription } from '../controllers/doctorController.js'


// doctorRoute.post('/', createHospital)
// doctorRoute.get('/:email', getHospitalAnnouncements)
// doctorRoute.put('/', createAnnouncement)
doctorRouter.get('/:email', getDoctorByEmail)
doctorRouter.delete('/', removeDoctor)
doctorRouter.post('/', createDoctor)
doctorRouter.post('/signup', registerDoctor)
doctorRouter.post('/login', loginAll)
doctorRouter.post('/delete', deleteAccount)
doctorRouter.post('/prescription', sendPrescription)

export default doctorRouter