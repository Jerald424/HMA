import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { useTheme } from 'src/hooks/useTheme';

interface HMACardProps extends TouchableOpacityProps {
  border?: {
    width: 'hairline';
  };
  cmpType?: 'TouchableOpacity' | 'View';
}

export default function HMACard({
  cmpType = 'TouchableOpacity',
  border,
  ...props
}: HMACardProps) {
  const { colors, metrics } = useTheme();

  const Cmp = {
    TouchableOpacity: TouchableOpacity,
    View: View,
  }[cmpType];

  return (
    <Cmp
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
