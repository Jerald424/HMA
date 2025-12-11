import { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { colors } from 'src/theme/colors';
import HMAText from '../text';

export default function FixedAlert({
  color,
  message,
}: {
  color: keyof typeof colors;
  message: ReactNode | string;
}) {
  const { spacing, colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors[color],
        padding: spacing.xs,
      }}
    >
      {typeof message == 'string' || typeof message == 'number' ? (
        <HMAText color="textPrimary" align="center">
          {message}
        </HMAText>
      ) : (
        message
      )}
    </View>
  );
}
