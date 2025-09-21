import React from 'react';
import {
  View,
  Button,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import GeofenceBridge from 'src/geofence/GeofenceBridge';
import { GEOFENCE } from './Map';

async function requestPermissions() {
  if (Platform.OS !== 'android') return true;

  try {
    const fine = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    const bg = PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION;

    const granted = await PermissionsAndroid.requestMultiple([fine, bg]);
    // check granted[fine] and granted[bg] values
    return true;
  } catch (e) {
    return false;
  }
}

export default function RegisterGeo() {
  const addSampleGeofence = async () => {
    const ok = await requestPermissions();
    if (!ok) {
      Alert.alert('Permissions needed');
      return;
    }
    const id = 'VICTORIA MENS PG';
    const lat = 13.055501;
    const lon = 80.253492;
    const radius = 40.0;

    try {
      await GeofenceBridge.addGeofence(
        GEOFENCE.id,
        GEOFENCE.latitude,
        GEOFENCE.longitude,
        GEOFENCE.radius,
      );
      Alert.alert('Geofence added', id);
    } catch (e) {
      console.log('ERROR: ', e);
      Alert.alert('Add failed', e.message);
    }
  };

  const saveSession = async () => {
    const sessionId = 'abc-123-sessiontoken'; // get from login flow
    try {
      await GeofenceBridge.saveSessionId(sessionId);
      Alert.alert('session saved');
    } catch (e) {
      Alert.alert('save session failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Save Session (simulate login)" onPress={saveSession} />
      <Button title="Add Geofence" onPress={addSampleGeofence} />
      <Button
        title="REMOVE"
        onPress={() => GeofenceBridge.removeGeofence('VICTORIA MENS PG')}
      />
    </View>
  );
}
