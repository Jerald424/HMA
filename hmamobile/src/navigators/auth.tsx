import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'src/hooks/useTheme';
import Dashboard from 'src/screens/dashboard';
import Landing from 'src/screens/landing';
import Map from 'src/screens/map';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.background,
        },
        headerTintColor: colors.background,
      }}
    >
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
