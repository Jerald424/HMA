import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'src/hooks/useTheme';
import Dashboard from 'src/screens/dashboard';
import Map from 'src/screens/map';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const {colors} = useTheme();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:colors.primary,
      },
      headerTitleStyle:{
        color:colors.background
      },
      headerTintColor:colors.background
    }}>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{
        headerShown:false
      }} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
