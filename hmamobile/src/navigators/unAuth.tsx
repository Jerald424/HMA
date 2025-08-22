import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
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
      <HMAButton
        title="#####"
        color="warning"
        style={{ alignSelf: 'flex-end' }}
        // variant="outline"
        size="md"
        leftIcon="settings"
        // rightIcon="settings"
      />
    </View>
  );
};
