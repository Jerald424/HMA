import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from 'src/utils/permission';

export let GEOFENCE = {
  latitude: 13.055663, // 🔹 your geofence center
  longitude: 80.253559,
  radius: 200.0, // in meters
  id: 'VICTORIA MENS PG',
};

export default function GeofenceDebugScreen() {
  const [location, setLocation] = useState(null);
  console.log('location: ', location);

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

  if (!location)
    return <View style={{ flex: 1, backgroundColor: '#ff0000ff' }} />;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: GEOFENCE.latitude,
        longitude: GEOFENCE.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Geofence center */}
      <Marker
        coordinate={{
          latitude: GEOFENCE.latitude,
          longitude: GEOFENCE.longitude,
        }}
        title="Geofence Center"
      />

      {/* Geofence radius */}
      <Circle
        center={{ latitude: GEOFENCE.latitude, longitude: GEOFENCE.longitude }}
        radius={GEOFENCE.radius}
        strokeWidth={2}
        strokeColor="rgba(0, 150, 255, 0.8)"
        fillColor="rgba(0, 150, 255, 0.2)"
      />

      {/* Current location */}
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        pinColor="red"
        title="You are here"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
