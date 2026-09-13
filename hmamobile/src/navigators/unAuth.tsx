import { createStackNavigator } from '@react-navigation/stack';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import Login from 'src/screens/login';
import LoginOtp from 'src/screens/loginOtp';
import fonts from 'src/utils/fonts';

const Stack = createStackNavigator();

export default function UnAuthNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors?.background,
        },
        headerTitleStyle: {
          color: colors.textSecondary,
          fontFamily: fonts.title,
        },

        headerBackImage: () => (
          <HMAIcon
            name="arrow_down"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login Otp"
        component={LoginOtp}
        options={{
          headerTitle: 'Verify your identity',
        }}
      />
    </Stack.Navigator>
  );
}
