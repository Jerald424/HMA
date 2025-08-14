import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import HMATextInput from 'src/components/styled/atoms/input';
import HMAText from 'src/components/styled/atoms/text';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import HMAModalOrganism from 'src/components/styled/organism/modal';
import HMAModalTemplate from 'src/components/styled/template/modal';

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
    <View style={{ padding: 10 }}>
      <HMATextInputMolecule placeholder="Enter Location" />
    </View>
  );
};
