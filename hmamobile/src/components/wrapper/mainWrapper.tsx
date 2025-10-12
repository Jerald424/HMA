import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from 'src/redux/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

export default function MainWrapper() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </NavigationContainer>
  );
}
