import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from 'src/screens/dashboard';
import Map from 'src/screens/map';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
