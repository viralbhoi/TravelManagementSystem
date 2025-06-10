
import { useEffect, useState, useContext } from "react"

import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const {
    setLoggedInUser,
    admins,
    users,
    drivers,
    setAdmins,
    setDrivers,
    setUsers,
  } = useAppContext();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(""); // only for UI (e.g., vehicle dropdown)

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const selectedRole = form.role.value;
    const email = form.email.value;
    const password = form.password.value;

    if (isLogin) {
      let user = null;

      if (selectedRole === "user") {
        user = users.find((u) => u.email === email);
      } else if (selectedRole === "driver") {
        user = drivers.find((u) => u.email === email);
      } else {
        user = admins.find((u) => u.email === email);
      }

      if (!user || user.password !== password) {
        return alert("Invalid Credentials");
      }

      setLoggedInUser({ ...user, role: selectedRole });
      navigate(`/${selectedRole}`);
    } else {
      const newUser = {
        name: `${form.fname.value} ${form.lname.value}`,
        email,
        password,
      };

      if (selectedRole === "user") {
        setUsers((prev) => [...prev, newUser]);
      } else if (selectedRole === "driver") {
        const vehicleType = form.vehicle.value;
        setDrivers((prev) => [
          ...prev,
          { ...newUser, vehicleType },
        ]);
      } else {
        setAdmins((prev) => [...prev, newUser]);
      }

      setTimeout(() => {
        setIsLogin(true);
      }, 1000);
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-indigo-900 shadow-xl shadow-amber-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="flex items-center justify-center text-2xl">
          {isLogin ? "Login" : "Signup"}
        </h1>

        <div className="flex justify-center pt-6 gap-10 mb-5">
          <button
            type="button"
            className={`flex-1 rounded-2xl h-10 ${
              isLogin ? "bg-indigo-400" : "bg-indigo-100"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 rounded-2xl h-10 ${
              isLogin ? "bg-indigo-100" : "bg-indigo-400"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <form
          className="flex-col space-y-7 items-center justify-center"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <>
              <div>
                <label htmlFor="fname" className="block pb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  required
                  placeholder="First name"
                  className="px-3 py-2 w-full border rounded bg-amber-50"
                />
              </div>

              <div>
                <label htmlFor="lname" className="block pb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  placeholder="Last name"
                  className="px-3 py-2 w-full border rounded bg-amber-50"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block pb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              required
              placeholder="Email"
              className="px-3 py-2 w-full border rounded bg-amber-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block pb-2">
              Password
            </label>
            <input
              type="text"
              name="password"
              required
              placeholder="Password"
              className="px-3 py-2 w-full border rounded bg-amber-50"
            />
          </div>

          <div>
            <label htmlFor="role" className="block pb-2">
              Role
            </label>
            <select
              name="role"
              required
              onChange={handleRoleChange}
              className="px-3 py-2 w-full border rounded bg-amber-50"
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {!isLogin && role === "driver" && (
            <div>
              <label htmlFor="vehicle" className="block pb-2">
                Vehicle Type
              </label>
              <select
                name="vehicle"
                required
                className="px-3 py-2 w-full border rounded bg-amber-50"
              >
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 py-2 px-3 w-full border rounded hover:bg-blue-600 bg-indigo-400"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>

  );
}


