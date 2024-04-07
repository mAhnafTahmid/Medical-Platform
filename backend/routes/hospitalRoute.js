import express from "express";
const hospitalRouter = express.Router()
import { createHospital, getHospitalAnnouncements, createAnnouncement, deleteAnnouncement, getAllHospitals, signUpHospital, makeAppointment } from '../controllers/hospitalController.js'


hospitalRouter.post('/', createHospital)
hospitalRouter.get('/:email', getHospitalAnnouncements)
hospitalRouter.put('/', createAnnouncement)
hospitalRouter.delete('/', deleteAnnouncement)
hospitalRouter.get('/', getAllHospitals)
hospitalRouter.post('/signup', signUpHospital)
hospitalRouter.post('/appoinment', makeAppointment)

export default hospitalRouter