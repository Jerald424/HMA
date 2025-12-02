import { View } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';

export default function Shutter() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 2,
        borderWidth: 4,
        borderRadius: 50,
        borderColor: colors.primary,
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          backgroundColor: colors.primary,
          borderRadius: 50,
        }}
      />
    </View>
  );
}
