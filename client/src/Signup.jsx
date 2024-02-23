import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [place, setPlace] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        axios.post('http://localhost:3001/register',{ name, email, speciality, place, password })
        .then(result=>{ console.log(result)
        navigate('./login')
        })
        .catch(err=> console.log(err))
        //console.log("Form submitted:", { name, email, speciality, place, password });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="speciality">
                            <strong>Speciality</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Speciality"
                            autoComplete="off"
                            name="speciality"
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="place">
                            <strong>Place</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Place"
                            autoComplete="off"
                            name="place"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control rounded-0"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already have an account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
