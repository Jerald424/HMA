import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

export let GEOFENCE = {
  latitude: 13.055663, // 🔹 your geofence center
  longitude: 80.253559,
  radius: 200.0, // in meters
  id: 'VICTORIA MENS PG',
};

export default function Map() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        console.log('pos: ', pos);
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

  if (!location) return <HMAText>LOADING</HMAText>;
  return (
    <Container padding={0}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: GEOFENCE.latitude,
          longitude: GEOFENCE.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.longitude,
          }}
          pinColor="red"
          title="You are here"
        />
      </MapView>
    </Container>
  );
}
