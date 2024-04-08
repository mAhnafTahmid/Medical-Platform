import Hospital from '../models/hospitalModel.js'
import Patient from '../models/patientModel.js';
import bcrypt from 'bcrypt';

export const createHospital = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.phoneNo ||
            !req.body.city ||
            !req.body.area ||
            !req.body.roadNo ||
            !req.body.houseNo ||
            !req.body.departments ||
            !req.body.description 
        ){
            return res.status(400).send({
                message: 'Send all the required fields: name, email, phone number, city, area, road number, house number, departments, description'
            })
        }
        const newHospital = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            city: req.body.city,
            area: req.body.area,
            roadNo: req.body.roadNo,
            houseNo: req.body.houseNo,
            laneNo: req.body.laneNo,
            departments: req.body.departments,
            description: req.body.description,
            pendingRequests: req.body.pendingRequests,
            announcements: req.body.announcements
        }

        const hospital = await Hospital.create(newHospital)

        return res.status(200).send(hospital)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const getHospitalAnnouncements = async (req, res) => {
    try {
        if (!req.params.email){
            return res.status(400).send({
                message: 'No hospital to search for announcement'
            })
        }
        const hospital = await Hospital.findOne({ email: req.params.email })
        return res.status(200).send(hospital);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const createAnnouncement = async (req, res) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()

    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    const dateTime = `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`
    try {
        if (
            !req.body.email ||
            !req.body.announcements
        ){
            return res.status(400).send({
                message: 'No announcement or email found'
            })
        }
        const announcement = [dateTime, req.body.announcements]
        const updatedHospital = await Hospital.findOneAndUpdate(
            { email: req.body.email }, 
            { $push: { announcements: announcement } }, 
            { new: true } 
        );
        return res.status(200).send(updatedHospital)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const deleteAnnouncement = async (req, res) => {
    try {
        if (
            !req.body.email ||
            !req.body.announcementDate
        ){
            return res.status(400).send({
                message: 'No announcement date or email found'
            })
        }
        const updatedHospital = await Hospital.findOneAndUpdate(
            { email: req.body.email },
            { $pull: { announcements: { $elemMatch: { $eq: req.body.announcementDate } } } },
            { new: true }
        );
        return res.status(200).send(updatedHospital)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const getAllHospitals = async (req, res) => {
    try {
        const hospital = await Hospital.find()
        return res.status(200).send(hospital);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const signUpHospital = async (req, res) => {
    try {
        const { name, email, phoneNo, address, area, city, password, description, departments } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const departmentNames = Object.keys(departments);
        const emptyDepartments = {};
        departmentNames.forEach(departmentName => {
            emptyDepartments[departmentName] = [];
        });
        const newHospital = new Hospital({ 
            name, 
            email, 
            phoneNo, 
            city, 
            area, 
            address, 
            departments: emptyDepartments, 
            description, 
            password: hashedPassword, 
            announcements: [],
            fee: '500' 
        });

        await newHospital.save();

        res.status(201).json({ message: 'Hospital created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const makeAppointment = async (req, res) => {
  const { patientName, patientEmail, selectedDepartment, selectedDoctor, hospitalEmail } = req.body;

  try {
    const hospital = await Hospital.findOne({ email: hospitalEmail });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const department = hospital.departments.find(dep => dep.name === selectedDepartment);
    if (!department) {
    return res.status(404).json({ message: 'Department not found' });
    }

    // Find the selected doctor in the department
    const doctor = department.appointments.find(doc => doc.name === selectedDoctor);
    if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
    }

    // Calculate estimated time
    const estimatedTime = ((doctor.appointments.length / 30) * 5).toString();

    // Insert appointment details into doctor's appointments
    doctor.appointments.push([patientName, patientEmail]);

    // Save changes to the hospital
    await hospital.save();

    // Insert appointment details into patient schema
    const patient = await Patient.findOne({ email: patientEmail });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    patient.appointments.push([hospital.name, selectedDoctor, estimatedTime]);
    await patient.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createDepartment = async (req, res) => {
    try {
        const { hospitalEmail, departmentName } = req.body;
        const hospital = await Hospital.findOne({ email: hospitalEmail });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        
        // Check if the department already exists
        if (hospital.departments.has(departmentName)) {
            return res.status(400).json({ error: 'Department already exists' });
        }
        
        // Add the new empty department to the departments Map
        hospital.departments.set(departmentName, []);

        await hospital.save();

        res.status(201).json(hospital);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const removeDepartment = async (req, res) => {
    try {
        const { hospitalEmail, departmentName } = req.body;
        const hospital = await Hospital.findOne({ email: hospitalEmail });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        
        // Check if the department exists
        if (!hospital.departments.has(departmentName)) {
            return res.status(400).json({ error: 'Department does not exist' });
        }
        
        // Remove the department from the departments Map
        hospital.departments.delete(departmentName);

        await hospital.save();

        res.status(200).json(hospital);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateFee = async (req, res) => {
    try {
        const { mail, newFee } = req.body;
        const hospital = await Hospital.findOne({ email: mail });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        // Convert newFee to a number
        const feeAsNumber = Number(newFee);

        // Check if newFee is a valid number
        if (isNaN(feeAsNumber)) {
            return res.status(400).json({ error: 'New fee must be a valid number' });
        }

        // Update the fee property with the newFee value
        hospital.fee = feeAsNumber;

        // Save the updated hospital document
        await hospital.save();

        res.status(200).json(hospital);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

