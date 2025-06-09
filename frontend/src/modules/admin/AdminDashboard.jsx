import { useAppContext } from "../../context/AppContext.jsx";

export default function AdminDashboard() {
    const { trips, setTrips, drivers } = useAppContext();
    const pendingTrips = trips.filter((t) => t.status === "pending");

    const isDriverAvailable = (driverId, tripDate) => {
        return !trips.some(
            (t) =>
                t.driverId === driverId &&
                t.date === tripDate &&
                t.status !== "completed"
        );
    };

    const handleAssign = (trip, driverId) => {
        const updated = trips.map((t) =>
            t.id === trip.id ? { ...t, status: "approved", driverId } : t
        );
        setTrips(updated);
    };

    const handleReject = (trip, reason) => {
        const updated = trips.map((t) =>
            t.id === trip.id
                ? { ...t, status: "rejected", rejectionReason: reason }
                : t
        );
        setTrips(updated);
    };

    return pendingTrips.map((trip) => {
        const available = drivers.filter(
            (d) =>
                d.vehicleType === trip.vehicleType &&
                isDriverAvailable(d.id, trip.date)
        );
        return (
            <div key={trip.id}>
                <p>
                    Trip: {trip.date}, Vehicle: {trip.vehicleType}
                </p>
                {available.length > 0 ? (
                    available.map((d) => (
                        <button onClick={() => handleAssign(trip, d.id)}>
                            Assign {d.name}
                        </button>
                    ))
                ) : (
                    <>
                        <select
                            onChange={(e) => handleReject(trip, e.target.value)}
                        >
                            <option>Select Rejection Reason</option>
                            <option>No driver available</option>
                            <option>Bad weather</option>
                            <option>Government restriction</option>
                        </select>
                    </>
                )}
            </div>
        );
    });
}
