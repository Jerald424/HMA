import { Button, View } from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <View>
      <Button title="MAP" onPress={() => navigation.navigate('map')} />
      <Button title="dummy" onPress={() => navigation.navigate('dummy')} />
      <Button
        title="SET LOCATION"
        onPress={() => navigation.navigate('set_location')}
      />
      <Button
        title="REGISTER"
        onPress={() => navigation.navigate('register')}
      />
    </View>
  );
}
