import { View } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { colors } from 'src/theme/colors';
import HMAText from '../text';
import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FixedAlert({
  color,
  message,
}: {
  color: keyof typeof colors;
  message: ReactNode | string;
}) {
  const { spacing, colors } = useTheme();
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: colors[color],
        padding: spacing.xs,
        paddingTop: top,
      }}
    >
      {typeof message == 'string' || typeof message == 'number' ? (
        <HMAText color="textPrimary">{message}</HMAText>
      ) : (
        message
      )}
    </View>
  );
}
