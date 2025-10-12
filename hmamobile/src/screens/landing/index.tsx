import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HMAIcon from 'src/components/styled/atoms/icon';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import Dashboard from '../dashboard';
import Profile from '../profile';
import useLanding from './useLanding';

const Tab = createBottomTabNavigator();

export default function Landing() {
  const { colors } = useTheme();
  useLanding();

  const TabBarIcon = ({ name }: { name: iconType }) => {
    return <HMAIcon name={name} variant="textPrimary" />;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 6,
          backgroundColor: colors?.background,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'home_fill' : 'home_outline'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'user_fill' : 'user_outline'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
