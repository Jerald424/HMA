import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store, { persistor } from 'src/redux/store';
import { Provider } from 'react-redux';
import { ModalProvider } from 'react-native-modalfy';
import ModalfyProvider from './modalfy/modalfyProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

export default function MainWrapper() {
  return (
    <GestureHandlerRootView>
      <ModalfyProvider>
        <NavigationContainer>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </NavigationContainer>
      </ModalfyProvider>
    </GestureHandlerRootView>
  );
}
