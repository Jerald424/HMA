import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { colors, metrics, spacing } = useTheme();

  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingHorizontal: spacing.md,
          paddingTop: spacing.md + top,
          paddingBottom: spacing.sm,
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          // paddingTop:top
        },
      ]}
    >
      <HMAText variant="title" size="title" numberOfLines={1}>
        {title}
      </HMAText>
      <HMAText color="textSecondary" size="small">
        {description}
      </HMAText>
    </View>
  );
}
