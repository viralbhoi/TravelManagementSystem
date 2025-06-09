import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function UserDashboard() {
    const { trips, loggedInUser, setLoggedInUser} = useAppContext();
    const navigate = useNavigate();

    const handleLogout =() =>{
        setLoggedInUser(null);
        localStorage.removeItemItem("loggedInUser");
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

    const userTrips = trips.filter((trip) => trip.userId === loggedInUser.id);

    return (
        <div className="container">
            <div className="row text-center pb-5 m-5">
                <h1 className="fs-1">User Dashboard</h1>
            </div>

            <div className="row">
                {userTrips.length === 0 ? (
                    <p className="text-center">You have no trips booked yet.</p>
                ) : (
                    <table className="table table-bordered table-hover text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Pickup City</th>
                                <th>Destination City</th>
                                <th>Vehicle Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTrips.map((trip, index) => (
                                <tr key={index}>
                                    <td>{trip.startDate}</td>
                                    <td>{trip.endDate}</td>
                                    <td>{trip.pickUp}</td>
                                    <td>{trip.destination}</td>
                                    <td>{trip.vehicleType}</td>
                                    <td>
                                        {trip.status === "rejected"
                                            ? `Rejected - ${trip.rejectionReason}`
                                            : trip.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="row justify-content-center align-items-center mt-5">
                <Link to="/user-booking">
                    <button
                        className="btn btn-primary mt-3"
                        style={{ display: "block", margin: "auto" }}
                    >
                        Book a Trip
                    </button>
                </Link>
            </div>

            <div className="row justify-content-center align-items-center mt-5">
                
                    <button
                        className="btn btn-danger mt-3"
                        style={{ display: "block", margin: "auto", width:"30%"}}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
            </div>
        </div>
    );
}
