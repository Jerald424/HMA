import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useEffect, useMemo, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import useLiveLocation from 'src/hooks/useLiveLocation';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import { useUserInfo } from 'src/redux/hooks';
import OfficeCircle from './office';
import UserIcon from './user';
import HMAIcon from 'src/components/styled/atoms/icon';
import { View } from 'react-native';

export let GEOFENCE = {
  latitude: 13.055663, // 🔹 your geofence center
  longitude: 80.253559,
  radius: 200.0, // in meters
  id: 'VICTORIA MENS PG',
};

export default function Map() {
  const { location } = useLiveLocation();
  const { data: userInfo } = useUserInfo();

  const userLocation = {
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
  };

  if (!location) return <HMAModalLoader isVisible />;
  return (
    <Container padding={0} safeAreaViewProps={{ edges: [] }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          key="user-marker"
          coordinate={userLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          tracksViewChanges={false}
          // icon={require('src/assets/avatar.png')}
        />
        {userInfo?.offices?.map(office => (
          <OfficeCircle
            key={office?.id}
            office={{
              id: office?.id,
              latitude: office?.lat,
              longitude: office?.long,
              name: office?.name,
              radius: office?.radius,
            }}
          />
        ))}
      </MapView>
    </Container>
  );
}
