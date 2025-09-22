import { createStackNavigator } from '@react-navigation/stack';
import GeofenceDebugScreen from './screens/Map';
import RegisterGeo from './screens/RegisterGeolocation';
import Dashboard from './screens/Dashboard';
import HMAText from './components/styled/atoms/text';
import SetLocation from './screens/SetLocation';
import Dummy from './screens/Dummy';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="map" component={GeofenceDebugScreen} />
      <Stack.Screen name="register" component={RegisterGeo} />
      <Stack.Screen name="set_location" component={SetLocation} />
      <Stack.Screen name="dummy" component={Dummy} />
    </Stack.Navigator>
  );
}
