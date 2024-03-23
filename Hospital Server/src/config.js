// config.js
const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb+srv://root:1234@cluster0.ggo0mg4.mongodb.net/");

connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", Loginschema);

module.exports = collection;
