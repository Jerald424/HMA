import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'src/hooks/useTheme';
import Landing from 'src/screens/landing';
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
    </Stack.Navigator>
  );
}
