import { useMemo, useState } from 'react';
import isInsideGeofence from 'src/function/findUserInsideGeoLocation';

export default function useTodayAttendance() {
  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const matchedOffice = useMemo(() => {
    try {
      //NEED TO CHANGE
      // return userInfo?.offices?.[5];
      return []?.find(office =>
        isInsideGeofence(
          {
            latitude: office?.lat,
            longitude: office?.long,
            radius: office?.radius,
          },
          userLocation?.latitude,
          userLocation?.longitude,
        ),
      );
    } catch (error) {}
  }, [userLocation]);

  return {
    setUserLocation,
  };
}
