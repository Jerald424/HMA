import React, { createContext, useContext } from 'react';

export const LandingContext = createContext({
  onAttendance: () => {},
  mode: { label: 'Check In', value: 'check-in' },
  setMode: () => {},
  isInitProgress: false,
  isPending: false,
  onSync: (arg: { start: number }) => {},
  employee: [],
});

export const useLandingContext = () => useContext(LandingContext);
