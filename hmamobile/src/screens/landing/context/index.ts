import { createContext, useContext } from 'react';

export const LandingContext = createContext({
  onAttendance: () => {},
});

export const useLandingContext = () => useContext(LandingContext);
