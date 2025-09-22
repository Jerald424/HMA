import { useState } from 'react';
import { Button, View } from 'react-native';
import { NativeModules } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import HMATextInput from 'src/components/styled/atoms/input';
import { GEOFENCE } from './Map';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import HMADivider from 'src/components/styled/atoms/divider';
const { DebugLocation } = NativeModules;
console.log('DebugLocation: ', DebugLocation);

export default function SetLocation() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [rad, setRad] = useState('');
  const setLocation = () => {
    // Replace with your geofence test location
    DebugLocation.setMockLocation(10.0, 80.25125);
  };

  return (
    <View style={{ padding: 10 }}>
      <HMATextInputMolecule onChangeText={setLat} placeholder="ENTER LAT" />
      <HMADivider />
      <HMATextInputMolecule onChangeText={setLon} placeholder="ENTER LON" />
      <HMADivider />

      <HMATextInputMolecule onChangeText={setRad} placeholder="ENTER RADIUS" />
      <HMADivider />

      <HMAButton
        title="SET"
        onPress={() =>
          Object.assign(GEOFENCE, {
            latitude: +lat,
            longitude: +lon,
            radius: +rad,
          })
        }
      />
      <HMADivider />

      {/* <Button title="Set Test Location" onPress={setLocation} /> */}
    </View>
  );
}
