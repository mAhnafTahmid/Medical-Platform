import Hospital from '../models/hospitalModel.js'

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
