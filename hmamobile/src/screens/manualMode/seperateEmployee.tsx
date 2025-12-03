import { View } from 'react-native';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

export default function SeparateEmployee() {
  const { spacing } = useTheme();
  return (
    <>
      <View style={[cStyle.rowAlign]}>
        <HMAAvatar source={require('src/assets/avatar.png')} size="md" />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <HMAText>Employee Name</HMAText>
          <HMADivider />
          <HMAText size="small">Project Name</HMAText>
        </View>
      </View>
      <HMADivider space={'sm'} thickness={1} color="lightBackground" />
    </>
  );
}
