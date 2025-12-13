import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigators/auth';
import UnAuthNavigator from './navigators/unAuth';
import { useAuth } from './redux/hooks';
import useInitial from './hooks/initial/useInitial';
import HMAModalLoader from './components/styled/molecules/loader/modalLoader';
import SessionExpires from './components/layout/sessionExpires';
import { createContext, useContext } from 'react';

const AppContext = createContext({
  isConnected: false,
  isVerifyError: false,
  verifyToken: (arg: {
    token: string;
    url: string;
    onSuccess: (data: any) => void;
  }) => {},
});
export const useAppContext = () => useContext(AppContext);

const Stack = createStackNavigator();
export default function App() {
  const { isLogin } = useAuth();
  const { isLoadingInitial, isConnected, isVerifyError, verifyToken } =
    useInitial();
  if (isLoadingInitial) return <HMAModalLoader isVisible />;
  return (
    <AppContext value={{ isConnected, isVerifyError, verifyToken }}>
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
      </Stack.Navigator>
      <SessionExpires />
    </AppContext>
  );
}
