import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import HMAText from 'src/components/styled/atoms/text';

export default function Dummy() {
  const [state, setState] = useState();
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        console.log('pos: ', pos);
        setState(pos?.coords);
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

  return (
    <>
      <HMAText>{JSON.stringify(state)}</HMAText>
    </>
  );
}
