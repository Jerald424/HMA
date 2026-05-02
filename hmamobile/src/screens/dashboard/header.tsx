import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function Header() {
  const { colors, metrics, spacing } = useTheme();
  const { data } = useUserInfo();
  const navigation = useNavigation();

  return (
    <View style={[cStyle.rowAlign, { padding: spacing.md }]}>
      <View style={{ width: 30 }} />
      <HMAText style={{ flex: 1 }} variant="title" size="title" align="center">
        Hi, {data?.result?.data?.basic_info?.name}
      </HMAText>
      <View style={{ width: 30 }}>
        <HMAIcon name="bell" />
      </View>
    </View>
  );
}
