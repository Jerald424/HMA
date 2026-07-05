import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HMAIcon from 'src/components/styled/atoms/icon';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import Dashboard from '../dashboard';
import Profile from '../profile';
import useLanding from './useLanding';
import AddGeofence from '../dummy';
import { View } from 'react-native';
import HMAText from 'src/components/styled/atoms/text';
import LeaveList from '../leave/list';

const Tab = createBottomTabNavigator();

export default function Landing() {
  const { colors } = useTheme();
  useLanding();

  const TabBarIcon = ({ name }: { name: iconType }) => {
    return <HMAIcon name={name} variant="primary" />;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          // paddingTop: 6,
          backgroundColor: colors?.background,
        },
        tabBarActiveTintColor: colors.textPrimary,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <View>
              <TabBarIcon name={focused ? 'home_fill' : 'home_outline'} />
              {/* <HMAText>Dashboard</HMAText> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'user_fill' : 'user_outline'} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Testing"
        component={AddGeofence}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'user_fill' : 'user_outline'} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
