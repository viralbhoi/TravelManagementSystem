import { useAppContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import { Routes, Route } from 'react-router-dom';
import PendingTrips from "./components/PendingTrips.jsx";


 // export default function AdminDashboard() {
//     const { trips, setTrips, drivers } = useAppContext();
//     const pendingTrips = trips.filter((t) => t.status === "pending");

//     // Check if a driver is free on the requested start date
//     const isDriverAvailable = (driverId, tripStartDate) => {
//         return !trips.some(
//             (t) =>
//                 t.driverId === driverId &&
//                 t.startDate === tripStartDate &&
//                 t.status !== "completed"
//         );
//     };

//     const handleAssign = (trip, driverId) => {
//         const updated = trips.map((t) =>
//             t.id === trip.id ? { ...t, status: "approved", driverId } : t
//         );
//         setTrips(updated);
//     };

//     const handleReject = (trip, reason) => {
//         const updated = trips.map((t) =>
//             t.id === trip.id
//                 ? { ...t, status: "rejected", rejectionReason: reason }
//                 : t
//         );
//         setTrips(updated);
//     };

//     const handleRemoveData = () => {
//         localStorage.setItem("trips", JSON.stringify([]));
//         localStorage.setItem("loggedInUser", JSON.stringify(null));
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">
//                 Admin Dashboard – Pending Trip Requests
//             </h2>

//             {pendingTrips.length === 0 ? (
//                 <p className="text-center">✅ All trips have been reviewed!</p>
//             ) : (
//                 <table className="table table-bordered table-hover text-center align-middle">
//                     <thead className="table-dark">
//                         <tr>
//                             <th>Trip ID</th>
//                             <th>User</th>
//                             <th>Vehicle</th>
//                             <th>Pickup → Destination</th>
//                             <th>Start → End</th>
//                             <th>Available Drivers</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {pendingTrips.map((trip) => {
//                             const availableDrivers = drivers.filter(
//                                 (d) =>
//                                     d.vehicleType === trip.vehicleType &&
//                                     isDriverAvailable(d.id, trip.startDate)
//                             );

//                             return (
//                                 <tr key={trip.id}>
//                                     <td>{trip.id}</td>
//                                     <td>{trip.userId}</td>
//                                     <td>{trip.vehicleType}</td>
//                                     <td>
//                                         {trip.pickUp} → {trip.destination}
//                                     </td>
//                                     <td>
//                                         {trip.startDate} → {trip.endDate}
//                                     </td>
//                                     <td>
//                                         {availableDrivers.length > 0 ? (
//                                             <ul className="list-unstyled mb-0">
//                                                 {availableDrivers.map((d) => (
//                                                     <li key={d.id}>
//                                                         <button
//                                                             className="btn btn-sm btn-success my-1"
//                                                             onClick={() =>
//                                                                 handleAssign(
//                                                                     trip,
//                                                                     d.id
//                                                                 )
//                                                             }
//                                                         >
//                                                             Assign {d.name}
//                                                         </button>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         ) : (
//                                             <span className="text-danger">
//                                                 No drivers available
//                                             </span>
//                                         )}
//                                     </td>
//                                     <td>
//                                         {availableDrivers.length === 0 && (
//                                             <select
//                                                 className="form-select"
//                                                 onChange={(e) => {
//                                                     if (e.target.value !== "") {
//                                                         handleReject(
//                                                             trip,
//                                                             e.target.value
//                                                         );
//                                                     }
//                                                 }}
//                                             >
//                                                 <option value="">
//                                                     Reject - Select Reason
//                                                 </option>
//                                                 <option value="No driver available">
//                                                     No driver available
//                                                 </option>
//                                                 <option value="Bad weather">
//                                                     Bad weather
//                                                 </option>
//                                                 <option value="Government restriction">
//                                                     Government restriction
//                                                 </option>
//                                             </select>
//                                         )}
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             )}

//             <div className="row">
//                 <button
//                     className="btn btn-danger"
//                     style={{
//                         width: "40%",
//                         padding: "1%",
//                         display: "block",
//                         margin: "auto",
//                     }}
//                     onClick={handleRemoveData}
//                 >
//                     Remove All Data!!!
//                 </button>
//             </div>
//         </div>
//     );
// }

export default function AdminDashboard(){

    const { trips, loggedInUser, setLoggedInUser} = useAppContext();
    
    const userTripHystory=trips.filter((trip) => trip.userId === loggedInUser.id);
    const userTrip = userTripHystory.filter((trip) =>  trip.status==='pending');

    const navLinks = [
        { label: "Home", href: "/admin/" },
        { label: "Pending Trips", href: "/admin/pendingtrips" },
        // { label: "History", href: "/admin/history" },
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

    return(
        <>
            <div className="min-w-screen h-screen bg-blue-50">
            <Navbar title="Admin Dashboard" navLinks={navLinks} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home userTrips={userTrip}/>} />
                <Route path="/pendingtrips" element={<PendingTrips/>} />
                <Route path="" element={<div>Welcome to your dashboard!</div>} />
            </Routes>

        </div>
        </>
    );
}
