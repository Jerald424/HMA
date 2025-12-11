import { View } from 'react-native';
import HMAText from '../styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { useLandingContext } from 'src/screens/landing/context';
import Toggle from '../styled/molecules/toggle';

export default function Header({ title }: { title: string }) {
  const { spacing } = useTheme();
  const { mode, setMode } = useLandingContext();

  return (
    <View style={[{ padding: spacing.md }, cStyle.rowAlign]}>
      <HMAText style={{ flex: 1 }} size="large" color="textPrimary">
        {title}
      </HMAText>
      <Toggle
        selected={mode}
        onChange={setMode}
        data={[
          { label: 'Check In', value: 'check-in' },
          { label: 'Check Out', value: 'check-out' },
        ]}
      />
    </View>
  );
}
