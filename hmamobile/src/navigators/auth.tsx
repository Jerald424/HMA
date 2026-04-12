import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'src/hooks/useTheme';
import AttendanceList from 'src/screens/attendanceList';
import Dashboard from 'src/screens/dashboard';
import Landing from 'src/screens/landing';
import LeaveCreate from 'src/screens/leave/create';
import LeaveList from 'src/screens/leave/list';
import Map from 'src/screens/map';
import TestScreen from 'src/screens/TestScreen';
import fonts from 'src/utils/fonts';

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
          fontFamily: fonts.title,
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

      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttendanceList"
        component={AttendanceList}
        options={{ title: 'Attendance List' }}
      />

      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{ title: 'TestScreen' }}
      />
      <Stack.Screen
        name="Leave"
        component={LeaveList}
        options={{ title: 'Leave' }}
      />
      <Stack.Screen
        name="Leave Detail"
        component={LeaveCreate}
        options={{ title: 'Leave Detail' }}
      />
    </Stack.Navigator>
  );
}
