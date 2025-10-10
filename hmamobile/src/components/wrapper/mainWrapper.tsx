import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function MainWrapper() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
