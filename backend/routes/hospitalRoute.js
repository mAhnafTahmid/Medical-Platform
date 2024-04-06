import express from "express";
const hospitalRouter = express.Router()
import { createHospital, getHospitalAnnouncements, createAnnouncement, deleteAnnouncement, getAllHospitals, signUpHospital } from '../controllers/hospitalController.js'


hospitalRouter.post('/', createHospital)
hospitalRouter.get('/:email', getHospitalAnnouncements)
hospitalRouter.put('/', createAnnouncement)
hospitalRouter.delete('/', deleteAnnouncement)
hospitalRouter.get('/', getAllHospitals)
hospitalRouter.post('/signup', signUpHospital)

export default hospitalRouter