import express from "express";
const hospitalRouter = express.Router()
import { createHospital, getHospitalAnnouncements, createAnnouncement, deleteAnnouncement } from '../controllers/hospitalController.js'


hospitalRouter.post('/', createHospital)
hospitalRouter.get('/:email', getHospitalAnnouncements)
hospitalRouter.put('/', createAnnouncement)
hospitalRouter.delete('/', deleteAnnouncement)

export default hospitalRouter