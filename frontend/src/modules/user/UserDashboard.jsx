import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function UserDashboard() {
    const { trips, loggedInUser, user } = useAppContext();

    const userTrips = trips.filter((trip) => trip.userId === loggedInUser.id);

    console.log(userTrips);

    return (
        <div className="container">
            <div className="row text-center pb-5 m-5">
                <h1 className="fs-1">User Dashboard</h1>
            </div>

            <div className="row">
                <table>
                    <tr>
                        <th> Start Date</th>
                        <th> End Date</th>
                        <th> Pickup city</th>
                        <th> Destination city</th>
                        <th> Vehicle Type</th>
                        <th> Status</th>
                    </tr>

                    {userTrips.map((trip,index)=>{
                        return(
                        <tr key={index}>
                            <td>
                                {trip.startDate}
                            </td>
                            <td>
                                {trip.endDate}
                            </td>
                            <td>
                                {trip.pickUp}
                            </td>
                            <td>
                                {trip.destination}
                            </td>
                            <td>
                                {trip.vehicleType}
                            </td>
                            <td>
                                {trip.status === "rejected" ? (trip.status) : (`${trip.status} - ${trip.rejectionReason}`)}
                            </td>
                        </tr>)
                    })}
                </table>
            </div>

            <div className="row justify-content-center align-items-center mt-5">
                <Link to="/user-booking"><button className="btn btn-primary" style={{display:"block",margin:"auto"}}>Book a trip</button></Link>
            </div>
        </div>
    );
}
