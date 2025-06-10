import { useAppContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from 'react-router-dom';
import PendingTrips from "./components/PendingTrips.jsx";

export default function AdminDashboard(){
 const {loggedInUser,userloggedInUser, setLoggedInUser} = useAppContext();
    
    const navLinks = [
        { label: "Home", href: "/admin/" },
        // { label: "History", href: "/admin/history" },
    ];
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
        alert("You Logged Out");
        navigate("/admin");
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
            <div className="max-w-screen h-screen bg-blue-50">
            <Navbar title="Admin Dashboard" navLinks={navLinks} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<PendingTrips/>} />
                <Route path="" element={<div>Welcome to your dashboard!</div>} />
            </Routes>

        </div>
        </>
    );
}
