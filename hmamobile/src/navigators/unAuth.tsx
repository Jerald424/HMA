import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HMAModal from 'src/components/styled/atoms/modal';
import HMAText from 'src/components/styled/atoms/text';
import HMAModalMolecule from 'src/components/styled/molecules/modal';
import HMAModalOrganism from 'src/components/styled/organism/modal';

const Stack = createStackNavigator();

export default function UnAuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const Login = () => {
  return (
    <View>
      <HMAModalOrganism isVisible />
    </View>
  );
};
