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
        if (!startDate || !endDate || !pickUp || !destination) {
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
        <div className="flex-col items-center justify-center space-y-4">
            <div className="pt-4 flex justify-center text-2xl text-center ">
                <h1 className="text-gray-800 bg-blue p-2 rounded-xl">Book a trip !!</h1>
            </div>

            <div className="flex justify-evenly items-center space-y-9 flex-wrap ">            
                <div className="flex flex-wrap items-center">
                    <label htmlFor="vehicle flex-1">Select Vehicle: </label>
                    <select
                        id="vehicle"
                        className=" w-55 ring-1 rounded-md bg-amber-50 ring-blue-400 p-1"
                        onChange={(e) => setVehicleType(e.target.value)}
                    >
                        <option value="car">Car</option>
                        <option value="van">Van</option>
                        <option value="bus">Bus</option>
                    </select>
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                    <label htmlFor="startDate">Start Date: </label>
                    <input
                        type="date"
                        id="startDate"
                        className=" w-55 ring-1 rounded-md bg-amber-50 ring-blue-400 p-1"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                    <label htmlFor="endDate">End Date: </label>
                    <input
                        type="date"
                        id="endDate"
                        className=" w-55 ring-1 rounded-md bg-amber-50 ring-blue-400 p-1"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                    <label htmlFor="pickup">Pickup: </label>
                    <input
                        type="text"
                        id="pickup"
                        className=" w-55 ring-1 rounded-md bg-amber-50 ring-blue-400 p-1"
                        placeholder="Start"
                        value={pickUp}
                        onChange={(e) => setpickUp(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                    <label htmlFor="destination">Destination: </label>
                    <input
                        type="text"
                        id="destination"
                        className=" w-55 ring-1 rounded-md bg-amber-50 ring-blue-400 p-1"
                        placeholder="End"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
            </div>


            <button
                onClick={bookTrip}
                className="bg-blue-400 rounded-sm px-3.5 h-10 border-2 hover:bg-blue-500 mt-3"
                            style={{ display: "block", margin: "auto" }}
            >
                Book Trip
            </button>
        </div>
    );
}