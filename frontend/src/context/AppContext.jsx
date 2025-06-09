import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromLS, saveToLS } from '../utils/localStorageUtils';
import { dummyUsers, dummyDrivers } from '../data/DummyData' ;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(getFromLS('users') || dummyUsers);
  const [drivers, setDrivers] = useState(getFromLS('drivers') || dummyDrivers);
  const [trips, setTrips] = useState(getFromLS('trips') || []);
  const [loggedInUser, setLoggedInUser] = useState(getFromLS('loggedInUser') || null);

  useEffect(() => {
    saveToLS('users', users);
    saveToLS('drivers', drivers);
    saveToLS('trips', trips);
    saveToLS('loggedInUser', loggedInUser);
  }, [users, drivers, trips, loggedInUser]);

  return (
    <AppContext.Provider value={{ users, drivers, trips, setTrips, loggedInUser, setLoggedInUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
