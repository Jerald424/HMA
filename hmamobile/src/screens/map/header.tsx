import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

export default function Header() {
  const { spacing } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[cStyle.rowAlign, { padding: spacing.md }]}>
      <TouchableOpacity hitSlop={10} onPress={navigation.goBack}>
        <HMAIcon name="arrow_left" variant="textPrimary" />
      </TouchableOpacity>
      <HMADivider variant="vertical" />
      <HMAText style={{ flex: 1 }} align="center" size="large">
        Work Location
      </HMAText>
      <HMADivider variant="vertical" />
    </View>
  );
}
