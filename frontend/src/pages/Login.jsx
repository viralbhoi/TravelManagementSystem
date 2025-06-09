import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

export default function Login() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("user");
    const { users, drivers, setLoggedInUser } = useAppContext();
    const navigate = useNavigate();

    const handleLogin = () => {
        let user = null;
        if (role === "user") user = users.find((u) => u.name === name);
        else if (role === "driver") user = drivers.find((d) => d.name === name);
        else user = { name, role }; // admin

        if (!user) return alert("User not found!");
        setLoggedInUser({ ...user, role });
        navigate(`/${role}`);
    };

    return (
        <div className="container p-5 m-5">
            <div className="row p-5">
                <label htmlFor="username">User Name: </label>
                <input
                    id="username"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="row p-5">
                <label htmlFor="role">Select Role: </label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="driver">Driver</option>
                </select>
            </div>

            <div className="row p-5">
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}
