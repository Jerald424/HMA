import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Test} />
    </Stack.Navigator>
  );
}

const Test = () => {
  return <Text>#########</Text>;
};
