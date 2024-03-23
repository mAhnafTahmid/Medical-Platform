// index.js
const express = require("express");
const session = require("express-session");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require("./user"); // Import the User model
const app = express();
const Appointment = require("./appointment");

// Configure express-session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a random secret key
    resave: false,
    saveUninitialized: true
}));


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect("mongodb+srv://root:1234@cluster0.ggo0mg4.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database Connected Successfully");
}).catch(err => {
    console.error("Database connection error:", err);
});

// Define the signup route
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            res.send('User already exists. Please choose a different email.');
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new collection({
                name,
                email,
                password: hashedPassword
            });

            await newUser.save();
            res.render("home");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Define login route
app.get("/login", (req, res) => {
    res.render("login"); // Assuming you want to render a login form
});

// index.js
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            res.send("User with this email does not exist.");
            return;
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.send("Incorrect password.");
            return;
        }

        // Set session variable to indicate user is logged in
        req.session.isLoggedIn = true;
        req.session.userId = user._id; // Store user ID in session

        // Redirect to the home page or profile page
        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// Define the home route
app.get("/home", (req, res) => {
    // Check if the user is logged in
    if (req.session.isLoggedIn) {
        // Render the home page
        res.render("home");
    } else {
        // If not logged in, redirect to the login page
        res.redirect("/login");
    }
});

// Define the logout route
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            res.send("Error logging out. Please try again.");
        } else {
            res.redirect("/login"); // Redirect to the login page after logout
        }
    });
});

// index.js
app.get("/profile", async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.isLoggedIn) {
            res.redirect("/login");
            return;
        }

        // Fetch user information from the database using stored user ID
        const user = await User.findById(req.session.userId);

        if (!user) {
            res.send("User not found.");
            return;
        }

        // Render the profile page with user information
        res.render("profile", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Define route for patient information (render form)
app.get("/apply-doctor", (req, res) => {
    res.render("apply-doctor");
});

// Handle form submission for doctor appointments
app.post("/apply-doctor", async (req, res) => {
    try {
        // Process doctor appointment information
        const { name, age, phone, address, weight, doctor_name, appointment_time } = req.body;
        
        // Create a new appointment object using the Appointment schema
        const newAppointment = new Appointment({
            name,
            age,
            phone,
            address,
            weight,
            doctor_name,
            appointment_time
        });

        // Save the new appointment to MongoDB
        await newAppointment.save();

        // Redirect to the appointments page or any other page as needed
        res.redirect("/appointments");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving appointment: " + error.message);
    }
});


// Define route for appointments page
app.get("/appointments", async (req, res) => {
    try {
        // Fetch all doctor appointments from the database
        const appointments = await Appointment.find();

        // Render the appointments page with appointments data
        res.render("appointments", { appointments });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});





const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
