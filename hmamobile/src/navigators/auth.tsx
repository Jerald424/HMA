import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { useAppContext } from 'src/App';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import AttendanceList from 'src/screens/attendanceList';
import Dashboard from 'src/screens/dashboard';
import Landing from 'src/screens/landing';
import Map from 'src/screens/map';
import fonts from 'src/utils/fonts';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { colors, spacing } = useTheme();
  const { isConnected } = useAppContext();
  return (
    <>
      {!isConnected && (
        <View style={{ backgroundColor: colors.error, padding: spacing.xs }}>
          <HMAText color="textPrimary">No internet connection!</HMAText>
        </View>
      )}
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
      </Stack.Navigator>
    </>
  );
}
