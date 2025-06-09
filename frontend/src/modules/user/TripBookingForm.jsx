import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';
import { useState } from 'react';

export default function TripBookingForm() {
  const { trips, setTrips, loggedInUser } = useAppContext();
  const [vehicleType, setVehicleType] = useState('car');
  const [date, setDate] = useState('');
    const navigate = useNavigate()

  const bookTrip = () => {
    const newTrip = {
      id: Date.now(),
      userId: loggedInUser.id,
      vehicleType,
      date,
      status: 'pending'
    };
    setTrips([...trips, newTrip]);
    alert('Trip requested!');
    navigate('/user');
  };

  return (
    <>
      <select onChange={e => setVehicleType(e.target.value)}>
        <option value="car">Car</option>
        <option value="van">Van</option>
        <option value="bus">Bus</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button onClick={bookTrip}>Book Trip</button>
    </>
  );
}
