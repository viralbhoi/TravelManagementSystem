import React, { useState } from 'react';
import { useAppContext } from "../../../context/AppContext";

export default function PendingTrips() {
  const {users,drivers,trips} = useAppContext()
  // Dummy drivers data

  const pendingTrips=trips.filter((trip)=>trip.status==='pending');

  const [selectedDriver, setSelectedDriver] = useState('');

  const assignTripToDriver = (tripId) => {
    if (!selectedDriver) {
      alert('Please select a driver first');
      return;
    }

    const driver = drivers.find(d => d.id === selectedDriver);
    setPendingTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId
          ? { ...trip, assignedDriver: driver.name, status: 'assigned' }
          : trip
      )
    );
    alert(`Trip assigned to ${driver.name}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Pending Trips Assignment</h1>
      

      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Driver
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
        >
          <option value="">-- Select Driver --</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name} ({driver.vehicleType})
            </option>
          ))}
        </select>
      </div>


      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Available Trips</h2>
        
        {pendingTrips && pendingTrips.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No pending trips available</p>
        ) : (
          pendingTrips && pendingTrips
            .map((trip) => (
              <div key={trip.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800">Trip #{trip.id}</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">From:</span> {trip.pickUp}</p>
                      <p><span className="font-medium">To:</span> {trip.destination}</p>
                      <p><span className="font-medium">Passenger:</span> {trip.userName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => assignTripToDriver(trip.id)}
                    disabled={!selectedDriver}
                    className={`self-center px-4 py-2 rounded-md transition-colors ${
                      selectedDriver
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}