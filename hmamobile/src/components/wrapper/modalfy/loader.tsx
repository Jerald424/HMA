import { View } from 'react-native';
import HMALoader from 'src/components/styled/atoms/loader';
import { useTheme } from 'src/hooks/useTheme';

export default function Loader() {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.background,
        alignSelf: 'center',
        padding: spacing.sm,
        borderRadius: 50,
      }}
    >
      <HMALoader size={'large'} />
    </View>
  );
}
