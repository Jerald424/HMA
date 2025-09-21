import { NativeModules } from 'react-native';
const { GeofenceModule } = NativeModules;
console.log('GeofenceModule: ', GeofenceModule)

export default {
  addGeofence: (id, lat, lon, radius) => GeofenceModule.addGeofence(id, lat, lon, radius),
  removeGeofence: (id) => GeofenceModule.removeGeofence(id),
  saveSessionId: (sessionId) => GeofenceModule.saveSessionId(sessionId),
};
