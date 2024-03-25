import express from "express";
const doctorRouter = express.Router()
import { removeDoctor, createDoctor } from '../controllers/doctorController.js'


// doctorRoute.post('/', createHospital)
// doctorRoute.get('/:email', getHospitalAnnouncements)
// doctorRoute.put('/', createAnnouncement)
doctorRouter.delete('/', removeDoctor)
doctorRouter.post('/', createDoctor)

export default doctorRouter