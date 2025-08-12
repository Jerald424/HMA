import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
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
      <HMAModalOrganism
        // isVisible
        avatarProps={{
          source: require('src/assets/avatar.png'),
        }}
        headingProps={{
          children: 'Are you sure?',
        }}
        descriptionProps={{
          children: `Do you want to logout.\n Your application data will lose`,
        }}
        cancelTextProps={{
          children: 'Cancel',
        }}
        okTextProps={{
          children: 'Ok',
        }}
      />
    </View>
  );
};
