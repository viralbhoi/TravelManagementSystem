import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function UserDashboard() {
    const { trips, loggedInUser, user } = useAppContext();

    const userTrips = trips.filter((trip) => trip.userId === loggedInUser.id);

    console.log(userTrips);

    return (
        <div className="container">
            <div className="row">
                <h1 className="fs-1">User Dashboard</h1>
            </div>

            <div className="row">
                <table>
                    <tr>
                        <th> Trip Date</th>
                        <th> Vehicle Type</th>
                        <th> Status</th>
                    </tr>

                    {userTrips.map((trip,index)=>{
                        return(
                        <tr key={index}>
                            <td>
                                {trip.date}
                            </td>
                            <td>
                                {trip.vehicleType}
                            </td>
                            <td>
                                {trip.status}
                            </td>
                        </tr>)
                    })}
                </table>
            </div>

            <div className="row">
                <Link to="/user-booking">Book a trip</Link>
            </div>
        </div>
    );
}
