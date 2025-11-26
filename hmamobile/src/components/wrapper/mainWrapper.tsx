import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import { ModalProvider } from 'react-native-modalfy';
import ModalfyProvider from './modalfy/modalfyProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

export default function MainWrapper() {
  return (
    <GestureHandlerRootView>
      <ModalfyProvider>
        <NavigationContainer>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </Provider>
        </NavigationContainer>
      </ModalfyProvider>
    </GestureHandlerRootView>
  );
}
