import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';

export default function HMALoader(props: ActivityIndicatorProps) {
  const { colors } = useTheme();
  return <ActivityIndicator color={colors?.primary} {...props} />;
}
