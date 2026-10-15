import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigators/auth';
import UnAuthNavigator from './navigators/unAuth';
import { useAuth } from './redux/hooks';
import useInitial from './hooks/initial/useInitial';
import HMAModalLoader from './components/styled/molecules/loader/modalLoader';
import SessionExpires from './components/layout/sessionExpires';
import { useTheme } from './hooks/useTheme';
import {
  CaptureProtection,
  useCaptureProtection,
} from 'react-native-capture-protection';
import React, { useEffect } from 'react';

const Stack = createStackNavigator();
export default function App() {
  const { isLogin } = useAuth();
  const { protectionStatus, status } = useCaptureProtection();

  useEffect(() => {
    const enableProtection = async () => {
      try {
        await CaptureProtection.prevent();
        console.log('Capture protection enabled');
      } catch (error) {
        console.error('Capture protection failed:', error);
      }
    };

    enableProtection();
  }, []);

  const { isLoadingInitial } = useInitial();
  if (isLoadingInitial) return <HMAModalLoader isVisible />;
  return (
    <>
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
    </>
  );
}
