import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import MapView, { Marker, Circle } from 'react-native-maps';

export let GEOFENCE = {
  latitude: 13.055663, // 🔹 your geofence center
  longitude: 80.253559,
  radius: 200.0, // in meters
  id: 'VICTORIA MENS PG',
};

export default function Map() {
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
      ></MapView>
    </Container>
  );
}
