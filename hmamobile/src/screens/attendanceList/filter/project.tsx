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

export default function ProjectFilter({ projectRef }: { projectRef: any }) {
  const { spacing } = useTheme();
  const { data } = useUserInfo();
  console.log('data: ', data);

  return (
    <HMABottomSheet
      ref={projectRef}
      customStyles={{ container: { height: 'auto' } }}
    >
      <View style={{ padding: spacing.md, maxHeight: SCREEN_HEIGHT - 100 }}>
        <HMAText size="large">Project Filter</HMAText>
        <HMADivider thickness={1} space={'md'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.offices?.map(val => (
            <TouchableOpacity
              key={val?.id}
              style={[cStyle.row, { padding: spacing.sm }]}
            >
              <HMACheckBox />
              <HMADivider variant="vertical" />
              <HMAText>{val?.name}</HMAText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <HMADivider />

        <HMAButton title="Apply" />
      </View>
    </HMABottomSheet>
  );
}
