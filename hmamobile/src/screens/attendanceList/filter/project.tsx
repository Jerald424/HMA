import { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import HMABadge from 'src/components/styled/atoms/badge';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMAButton from 'src/components/styled/atoms/button';
import HMACheckBox from 'src/components/styled/atoms/checkbox';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';
import { SCREEN_HEIGHT } from 'src/utils/variables';
import { useAttendanceListContext } from '..';

export default function ProjectFilter({ projectRef }: { projectRef: any }) {
  const { spacing } = useTheme();
  const { data } = useUserInfo();
  const [selected, setSelected] = useState(null);
  const { setFilters } = useAttendanceListContext();

  const onApply = () => {
    setFilters(prev => ({ ...prev, project_id: selected }));
    projectRef?.current?.close?.();
  };

  return (
    <HMABottomSheet
      ref={projectRef}
      customStyles={{ container: { height: 'auto' } }}
    >
      <View style={{ padding: spacing.md, maxHeight: SCREEN_HEIGHT - 100 }}>
        <HMAText size="large">Project Filter</HMAText>
        <HMADivider thickness={1} space={'md'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.offices?.map(val => {
            const isSelected = selected == val?.project?.id;
            return (
              <TouchableOpacity
                onPress={() =>
                  setSelected(isSelected ? null : val?.project?.id)
                }
                key={val?.id}
                style={[cStyle.row, { padding: spacing.sm }]}
              >
                <HMACheckBox isRadio value={isSelected} />
                <HMADivider variant="vertical" />
                <HMAText>{val?.name}</HMAText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <HMADivider />

        <HMAButton onPress={onApply} title="Apply" />
      </View>
    </HMABottomSheet>
  );
}
