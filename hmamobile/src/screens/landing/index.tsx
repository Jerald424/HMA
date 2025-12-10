import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import KioskAttendanceMode from '../kioskMode';
import useLanding from './useLanding';
import { LandingContext } from './context';
import SyncAttendance from '../sync';
import RegisterEmployee from '../registerEmployee';

const Tab = createBottomTabNavigator();

export default function Landing() {
  const { colors } = useTheme();
  const { contextValue } = useLanding();

  const Label = ({ focused, label }: { focused: boolean; label: string }) => (
    <View>
      <HMAText color={focused ? 'primary' : 'textSecondary'}>{label}</HMAText>
    </View>
  );
  return (
    <LandingContext value={contextValue}>
      <Tab.Navigator
        screenOptions={{
          tabBarIconStyle: {
            height: 0,
          },
          tabBarStyle: {
            paddingTop: 6,
            backgroundColor: colors?.background,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Kiosk"
          component={KioskAttendanceMode}
          options={{
            headerShown: false,
            title: '',
            tabBarLabel: ({ focused }) => (
              <Label focused={focused} label="Kiosk" />
            ),
          }}
        />

        <Tab.Screen
          name="Sync"
          component={SyncAttendance}
          options={{
            tabBarBadge: 9,
            tabBarBadgeStyle: {
              zIndex: 99,
              right: -10,
              top: -10,
              backgroundColor: colors.error,
            },
            headerShown: false,
            title: '',
            tabBarLabel: ({ focused }) => (
              <Label focused={focused} label="Sync" />
            ),
          }}
        />
        <Tab.Screen
          name="RegisterEmployee"
          component={RegisterEmployee}
          options={{
            headerShown: false,
            title: '',
            tabBarLabel: ({ focused }) => (
              <Label focused={focused} label="Register" />
            ),
          }}
        />
      </Tab.Navigator>
    </LandingContext>
  );
}
