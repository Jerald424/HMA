import React, { createContext, useContext } from 'react';

export const LandingContext = createContext({
  onAttendance: () => {},
  mode: { label: 'Check In', value: 'check-in' },
  setMode: () => {},
});

export const useLandingContext = () => useContext(LandingContext);
