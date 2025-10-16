import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { SCREEN_WIDTH } from 'src/utils/variables';

export default function Header() {
  const { colors, spacing, metrics } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          backgroundColor: colors?.primary,
          padding: spacing.md,
          borderRadius: 50,
          position: 'absolute',
          width: SCREEN_WIDTH - spacing.lg,
          top: top + spacing.md,
          zIndex: 99,
          margin: 'auto',
          alignSelf: 'center',
        },
        cStyle.rowAlign,
        metrics.shadow,
      ]}
    >
      <TouchableOpacity hitSlop={10} onPress={navigation.goBack}>
        <HMAIcon name="arrow_left" variant="background" />
      </TouchableOpacity>
      <HMADivider variant="vertical" />
      <HMAText
        style={{ flex: 1 }}
        align="center"
        size="large"
        color="background"
      >
        Offices
      </HMAText>
      <HMADivider variant="vertical" />

      <HMAIcon name="arrow_left" variant="primary" />
    </View>
  );
}
