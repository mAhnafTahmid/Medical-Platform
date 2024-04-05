import Hospital from '../models/hospitalModel.js'
import Doctor from '../models/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'super-secret-key'

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

// Arundhati's Doctor SignUp
export const registerDoctor = async (req, res) => {
    try {
        const { name, email, phoneNo, specialty, hospital, department, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Doctor({ 
            name,
            email,
            phoneNo,
            specialty,
            hospital,
            department,
            password: hashedPassword,
            pdfs: [] 
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Doctor.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }

        let isPasswordValid;
        try {
            isPasswordValid = await bcrypt.compare(password, user.password)
        } catch (error) {
            return res.status(500).json({ error: 'Error comparing passwords' })
        }

        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        let token;
        try {
            token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
        } catch (error) {
            return res.status(500).json({ error: 'Error signing token' })
        }

        res.status(200).json({ message: 'Login successful', token: token, user: user });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
}

export const getDoctorByEmail = async (req, res) => {
    try {
        if (!req.params.email){
            return res.status(400).send({
                message: 'No hospital to search for announcement'
            })
        }
        const doctor = await Doctor.findOne({ email: req.params.email })
        return res.status(200).send(doctor);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}
