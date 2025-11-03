// location.ts
import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  check,
  openSettings,
} from 'react-native-permissions';

const getPermissionForPlatform = () => {
  if (Platform.OS === 'android')
    return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  return PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
};

export async function ensureLocationPermission(): Promise<boolean> {
  const permission = getPermissionForPlatform();
  const status = await check(permission);

  if (status === RESULTS.GRANTED) return true;
  if (status === RESULTS.BLOCKED) {
    // User permanently denied — prompt to open settings
    // You can show a dialog before calling openSettings
    return false;
  }

  const req = await request(permission);
  return req === RESULTS.GRANTED;
}

export const checkLocationEnabled = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true, // Set to false to avoid waiting for GPS
        timeout: 60000, // Set a timeout (in milliseconds)
        maximumAge: 0, // Don't use a cached position
      },
    );
  });
};
