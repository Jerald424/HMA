import { Alert, NativeModules, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigators/auth';
import UnAuthNavigator from './navigators/unAuth';
import { useAuth } from './redux/hooks';
import useInitial from './hooks/initial/useInitial';
import HMAModalLoader from './components/styled/molecules/loader/modalLoader';
import SessionExpires from './components/layout/sessionExpires';
import { useEffect, useState } from 'react';
import Container from './components/styled/atoms/container';
import HMATextInput from './components/styled/atoms/input';
import HMAButton from './components/styled/atoms/button';
import HMATextInputMolecule from './components/styled/molecules/input';

const Stack = createStackNavigator();

const FaceSimilarity = NativeModules.FaceSimilarity
console.log('FaceSimilarity', FaceSimilarity);

export default function App() {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');

  const handleCompare = () => {
    FaceSimilarity.compare(firstInput, secondInput).then((result: any) => {
      console.log('FaceSimilarity result', result);
      Alert.alert(JSON.stringify(result));
    }).catch((error: any) => {
      Alert.alert('Error', JSON.stringify(error));
    })
  }

  return (
    <Container backgroundColor="background" >
      <View style={{ marginTop: 20 }}>
        <HMATextInputMolecule value={firstInput} onChangeText={setFirstInput} />
        <HMATextInputMolecule value={secondInput} onChangeText={setSecondInput} />
      </View>
      <HMAButton title="Compare" onPress={handleCompare} />
    </Container>
  )
  // const { isLogin } = useAuth();
  // const { isLoadingInitial } = useInitial();
  // if (isLoadingInitial) return <HMAModalLoader isVisible />;
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
