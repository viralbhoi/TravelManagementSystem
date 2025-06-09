import { useAppContext } from '../../context/AppContext.jsx';

export default function DriverDashboard() {
  const { trips, loggedInUser } = useAppContext();
  const myTrips = trips.filter(t => t.driverId === loggedInUser.id);

  return myTrips.map(t => (
    <div key={t.id}>
      <p>{t.date} - {t.vehicleType} - Status: {t.status}</p>
    </div>
  ));
}
