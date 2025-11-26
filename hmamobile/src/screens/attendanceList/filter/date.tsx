import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useAttendanceListContext } from '..';

export default function DateFilter({ dateRef }: { dateRef: any }) {
  const { spacing } = useTheme();
  const [selected, setSelected] = useState<string>('');
  const { setFilters } = useAttendanceListContext();

  const onApply = () => {
    setFilters(prev => ({ ...prev, date: selected }));
    dateRef?.current?.close?.();
  };

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
          ].map(val => {
            const isSelected = selected == val?.id;
            return (
              <TouchableOpacity
                key={val.id}
                style={{ margin: spacing.sm }}
                onPress={() => setSelected(isSelected ? '' : val?.id)}
              >
                <HMABadge
                  color={isSelected ? 'error' : 'textSecondary'}
                  label={val?.label}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <HMADivider />
        <HMAButton title="Apply" onPress={onApply} />
      </View>
    </HMABottomSheet>
  );
}
