import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    }
});

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    roadNo: {
        type: String,
        required: true
    },
    houseNo: {
        type: String,
        required: true
    },
    laneNo: {
        type: String
    },
    departments: {
        type: Map,
        of: [departmentSchema] 
    },
    description: {
        type: String,
        required: true
    },
    pendingRequests: {
        type: [String]
    },
    announcements: {
        type: [[String]]
    }
});

export default mongoose.model('Hospital', hospitalSchema);
