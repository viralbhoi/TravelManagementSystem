import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";
import { useState } from "react";

export default function TripBookingForm() {
    const { trips, setTrips, loggedInUser } = useAppContext();
    const [vehicleType, setVehicleType] = useState("car");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [pickUp, setpickUp] = useState("");
    const [destination, setDestination] = useState("");

    const navigate = useNavigate();

    const bookTrip = () => {

      if (!startDate || !endDate || !pickUp || !destination){
        alert("No field should be empty!");
        return false;
      }
        const newTrip = {
            id: Date.now(),
            userId: loggedInUser.id,
            vehicleType,
            startDate,
            endDate,
            pickUp,
            destination,
            status: "pending",
        };
        setTrips([...trips, newTrip]);
        alert("Trip requested!");
        navigate("/user");
    };

    return (
        <div className="container">
            <div className="row p-5 mt-5 mb-5 text-center"><h1>Book A trip !!</h1></div>
            <div className="row">
                <label htmlFor="vehicle">Select Vehicle: </label>
                <select
                    id="vehicle"
                    onChange={(e) => setVehicleType(e.target.value)}
                >
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="bus">Bus</option>
                </select>
            </div>
            <div className="row">
                <label htmlFor="startDate">Start Date: </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="row">
                <label htmlFor="endDate">End Date: </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className="row">
                <label htmlFor="pickup">Pickup: </label>
                <input
                    type="text"
                    id="pickup"
                    value={pickUp}
                    onChange={(e) => setpickUp(e.target.value)}
                />
            </div>
            <div className="row">
                <label htmlFor="destination">Destination: </label>
                <input
                    type="text"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>
            <button onClick={bookTrip}>Book Trip</button>
        </div>
    );
}
