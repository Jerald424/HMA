import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import { Text } from 'react-native';

export default function MainWrapper() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
