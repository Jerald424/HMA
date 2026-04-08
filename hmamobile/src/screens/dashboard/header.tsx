import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function Header() {
  const { colors, metrics } = useTheme();
  const { data } = useUserInfo();
  const navigation = useNavigation();

  return (
    <View
      style={[
        { flex: 1, paddingHorizontal: metrics.radius.lg },
        cStyle.rowJustify,
      ]}
    >
      <View style={{ flex: 1 }}>
        <HMAText color="background">Welcome</HMAText>
        <HMAText color="background" size="title">
          {data?.Employee_Name || '-'}
        </HMAText>
      </View>
      <Pressable onLongPress={() => navigation.navigate('TestScreen')}>
        <HMAAvatar
          size="md"
          style={{ tintColor: colors.background }}
          source={require('src/assets/icons/profile-user.png')}
        />
      </Pressable>
    </View>
  );
}
