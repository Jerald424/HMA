import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';

export default function useLiveLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        setLocation(pos?.coords);
      },
      err => console.log('Location error:', err),
      {
        enableHighAccuracy: false,
        distanceFilter: 1,
        interval: 2000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return {
    location,
  };
}
