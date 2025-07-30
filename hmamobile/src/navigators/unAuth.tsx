import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function UnAuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const Login = () => {
  return <View></View>;
};
