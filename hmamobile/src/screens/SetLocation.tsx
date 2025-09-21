import { Button, View } from 'react-native';
import { NativeModules } from 'react-native';
const { DebugLocation } = NativeModules;

export default function SetLocation() {
  const setLocation = () => {
    // Replace with your geofence test location
    DebugLocation.setMockLocation(13.053592, 80.25125);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Set Test Location" onPress={setLocation} />
    </View>
  );
}
