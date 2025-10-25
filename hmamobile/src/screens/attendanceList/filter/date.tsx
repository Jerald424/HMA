import { View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function DateFilter({ dateRef }: { dateRef: any }) {
  const { colors, spacing } = useTheme();

  return (
    <HMABottomSheet
      ref={dateRef}
      customStyles={{ container: { height: 'auto' } }}
    >
      <View style={{ padding: spacing.md }}>
        <HMAText size="large">Date Filter</HMAText>
        <HMADivider thickness={1} space={'md'} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {[
            { id: 'today', label: 'Today' },
            { id: 'this-week', label: 'This Week' },
            { id: 'last-week', label: 'Last Week' },
            { id: 'current-month', label: 'Current Month' },
            { id: 'last-month', label: 'Last Month' },
          ].map(val => (
            <HMABadge
              color="textSecondary"
              key={val.id}
              label={val?.label}
              style={{ margin: spacing.sm }}
            />
          ))}
        </View>
        <HMAButton title="Apply" />
      </View>
    </HMABottomSheet>
  );
}
