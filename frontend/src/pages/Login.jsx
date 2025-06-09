import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

export default function Login() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const { users, drivers, setLoggedInUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    let user = null;
    if (role === 'user') user = users.find(u => u.name === name);
    else if (role === 'driver') user = drivers.find(d => d.name === name);
    else user = { name, role }; // admin

    if (!user) return alert('User not found!');
    setLoggedInUser({ ...user, role });
    navigate(`/${role}`);
  };

  return (
    <div>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="driver">Driver</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
