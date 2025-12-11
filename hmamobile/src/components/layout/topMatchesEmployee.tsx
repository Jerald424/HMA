import isEmpty from 'lodash/isEmpty';
import HMAModalOrganism from '../styled/organism/modal';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SCREEN_HEIGHT } from 'src/utils/variables';
import HMADivider from '../styled/atoms/divider';
import { useTheme } from 'src/hooks/useTheme';
import HMAText from '../styled/atoms/text';
import HMAButton from '../styled/atoms/button';
import { useLandingContext } from 'src/screens/landing/context';

export default function TopMatchesEmployee({
  topMatch,
  onMatch,
}: {
  topMatch: any[];
  onMatch: (emp: any) => void;
}) {
  const { spacing, colors } = useTheme();
  const isVisible = !isEmpty(topMatch);
  const { setTopMatch } = useLandingContext();
  return (
    <>
      <HMAModalOrganism
        isVisible={isVisible}
        headingProps={{ children: "Could't find face exactly" }}
        descriptionProps={{ children: 'Pick one from top match' }}
      >
        <ScrollView
          style={{ maxHeight: SCREEN_HEIGHT - 200 }}
          contentContainerStyle={{ marginTop: spacing.md }}
        >
          {topMatch?.map?.(emp => (
            <View key={emp?.id}>
              <TouchableOpacity
                style={{
                  padding: spacing.md,
                  borderWidth: 1,
                  borderColor: colors.lightBackground,
                }}
                onPress={() => onMatch?.(emp)}
              >
                <HMAText>{emp?.name}</HMAText>
              </TouchableOpacity>
              <HMADivider />
            </View>
          ))}
        </ScrollView>
        <HMAButton title="Discard" onPress={() => setTopMatch([])}></HMAButton>
      </HMAModalOrganism>
    </>
  );
}
