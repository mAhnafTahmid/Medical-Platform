import express from "express";
const doctorRouter = express.Router()
import { removeDoctor, createDoctor, registerDoctor, loginDoctor } from '../controllers/doctorController.js'


// doctorRoute.post('/', createHospital)
// doctorRoute.get('/:email', getHospitalAnnouncements)
// doctorRoute.put('/', createAnnouncement)
doctorRouter.delete('/', removeDoctor)
doctorRouter.post('/', createDoctor)
doctorRouter.post('/signup', registerDoctor)
doctorRouter.post('/login', loginDoctor)

export default doctorRouter