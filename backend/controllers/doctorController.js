import Hospital from '../models/hospitalModel.js'
import Doctor from '../models/doctorModel.js';

export const removeDoctor = async (req, res) => {
    try {
        const { hospitalName, departmentName, doctorName } = req.body
        const hospital = await Hospital.findOne({ name: hospitalName })
        if (!hospital) {
            throw new Error('Hospital not found')
        }
        const department = hospital.departments.get(departmentName)
        if (!department) {
            throw new Error('Department not found')
        }
        const index = department.findIndex(doctor => doctor.name === doctorName)
        if (index === -1) {
            throw new Error('Doctor not found in the department')
        }
        department.splice(index, 1)
        await hospital.save()
        
        console.log(`Doctor ${doctorName} removed from ${departmentName} department in ${hospitalName} hospital`)
        return res.status(200).send(hospital)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: error.message })
    }
}


export const createDoctor = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.phoneNo ||
            !req.body.specialty ||
            !req.body.hospital
        ){
            return res.status(400).send({
                message: 'Send all the required fields: name, email, phone number, specialty, hospital'
            })
        }

        const newDoctor = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            specialty: req.body.specialty,
            hospital: req.body.hospital,
            pdfs: req.body.pdfs || []
        }

        const doctor = await Doctor.create(newDoctor)

        return res.status(200).send(doctor)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: error.message })
    }
};

