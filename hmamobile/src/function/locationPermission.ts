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
import { IS_ANDROID } from 'src/utils/variables';

const getPermissionForPlatform = () => {
  if (Platform.OS === 'android')
    return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  return PERMISSIONS.IOS.LOCATION_ALWAYS;
};

export async function ensureLocationPermission(): Promise<boolean> {
  if (!IS_ANDROID) {
    const whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (whenInUse === RESULTS.DENIED || whenInUse === RESULTS.BLOCKED) {
      return false;
    }

    // ⚠️ DO NOT REQUEST ALWAYS IMMEDIATELY
    // iOS will ignore it and return DENIED
    return true;
  }

  // Android stays the same
  const permission = getPermissionForPlatform();
  const status = await check(permission);

  if (status === RESULTS.GRANTED) return true;
  if (status === RESULTS.BLOCKED) return false;

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
        console.log('ERROR: ', error);
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 60000,
      },
    );
  });
};
