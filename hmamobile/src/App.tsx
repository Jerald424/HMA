import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigators/auth';
import UnAuthNavigator from './navigators/unAuth';

const Stack = createStackNavigator();
export default function App() {
  const isLogin = false;

  return (
    <Stack.Navigator>
      {isLogin ? (
        <Stack.Screen
          name="auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="un-auth"
          component={UnAuthNavigator}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen name="home" component={Test} />
    </Stack.Navigator>
  );
}

const Test = () => {
  return <Text>#########</Text>;
};
