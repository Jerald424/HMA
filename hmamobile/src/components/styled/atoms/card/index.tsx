import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from 'src/hooks/useTheme';

interface HMACardProps extends TouchableOpacityProps {
  border?: {
    width: 'hairline';
  };
}

export default function HMACard({ border, ...props }: HMACardProps) {
  const { colors, metrics } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: colors.background,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
        },
        props?.style,
      ]}
    />
  );
}
