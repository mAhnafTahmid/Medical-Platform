import express from "express";
const doctorRouter = express.Router()
import { removeDoctor } from '../controllers/doctorController.js'


// doctorRoute.post('/', createHospital)
// doctorRoute.get('/:email', getHospitalAnnouncements)
// doctorRoute.put('/', createAnnouncement)
doctorRouter.delete('/', removeDoctor)

export default doctorRouter