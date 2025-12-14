import { Vibration, Platform } from 'react-native';

export const makeErrorVibration = () => {
  try {
    // Error-like vibration: short → pause → short → pause → long
    const pattern =
      Platform.OS === 'ios'
        ? 400 // iOS ignores pattern, duration only
        : [0, 150, 100, 150, 100, 400];

    Vibration.vibrate(pattern);
  } catch (error) {
    console.error(error);
  }
};
