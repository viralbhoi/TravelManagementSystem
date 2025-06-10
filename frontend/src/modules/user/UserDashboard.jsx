import React from "react";
import { Routes, Route } from 'react-router-dom';
import History from "./component/History";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import TripBookingForm from "./TripBookingForm";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function UserDashboard() {
    
    const { trips, loggedInUser, setLoggedInUser} = useAppContext();
    
    const userTripHystory=trips.filter((trip) => trip.userId === loggedInUser.id);
    const userTrip = userTripHystory.filter((trip) =>  trip.status==='pending');



    console.log(userTrip)
    const navLinks = [
        { label: "Home", href: "/user/" },
        { label: "Bookings", href: "/user/booking" },
        { label: "History", href: "/user/history" },
    ];
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
        alert("You Logged Out");
        navigate("/user");
    }

    if (!loggedInUser) {
        return (
            <div className="container text-center mt-5">
                <h2>You are not logged in.</h2>
                <Link to="/">
                    <button
                        className="btn btn-primary mt-3"
                        style={{ display: "block", margin: "auto" }}
                    >
                        Login
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-w-screen h-screen bg-blue-50">
            <Navbar title="User Dashboard" navLinks={navLinks} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home userTrips={userTrip}/>} />
                <Route path="/booking" element={<TripBookingForm />} />
                <Route path="/history" element={<History userTripHys={userTripHystory} />} />
                <Route path="" element={<div>Welcome to your dashboard!</div>} />
            </Routes>

        </div>

    );
}