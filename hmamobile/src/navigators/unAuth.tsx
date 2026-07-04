import { createStackNavigator } from '@react-navigation/stack';
import Login from 'src/screens/login';
import LoginOtp from 'src/screens/loginOtp';

const Stack = createStackNavigator();

export default function UnAuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login Otp"
        component={LoginOtp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
