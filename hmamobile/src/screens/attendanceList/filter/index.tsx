import { useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HMABadge from 'src/components/styled/atoms/badge';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import DateFilter from './date';
import ProjectFilter from './project';

export default function Filter() {
  const { bottom } = useSafeAreaInsets();
  const { colors, spacing } = useTheme();
  const dateRef = useRef(null);
  const projectRef = useRef(null);

  return (
    <>
      <HMADivider />
      <View
        style={[
          {
            backgroundColor: colors.background,
            paddingBottom: bottom + spacing.sm,
          },
          cStyle.row,
        ]}
      >
        <HMAButton
          title="Date"
          variant="ghost"
          style={{ flex: 1, borderRadius: 0 }}
          leftIcon="calendar"
          onPress={dateRef?.current?.open}
        />
        <HMAButton
          title="Project"
          variant="ghost"
          style={{ flex: 1, borderRadius: 0 }}
          leftIcon="project"
          onPress={projectRef?.current?.open}
        />
      </View>
      <DateFilter dateRef={dateRef} />
      <ProjectFilter projectRef={projectRef} />
    </>
  );
}
