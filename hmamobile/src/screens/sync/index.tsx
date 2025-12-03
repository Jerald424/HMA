import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { HAIRLINE_WIDTH } from 'src/utils/variables';
import RotatingIcon from './rotate';
import HMAText from 'src/components/styled/atoms/text';
import HMABadge from 'src/components/styled/atoms/badge';

export default function SyncAttendance() {
  const { colors, spacing } = useTheme();
  return (
    <Container padding={0} backgroundColor="background">
      <ScrollView style={{ padding: spacing.md }}>
        <HMADivider space={'md'} />
        <TouchableOpacity
          style={[
            {
              backgroundColor: colors.background,
              shadowColor: colors.success,
              borderColor: colors.success,
            },
            style.syncRound,
            cStyle.rowJustify,
          ]}
        >
          <View>
            {/* <HMAText align="center"></HMAText>
            <HMADivider />

            <HMAIcon
              name="rotate"
              variant="success"
              style={{ height: 80, width: 80 }}
            />
            <HMADivider /> */}
            <HMAText align="center" size="title" color="success">
              Sync
            </HMAText>
          </View>
        </TouchableOpacity>
        <HMADivider space={'md'} />
        <HMAText align="center" variant="large">
          Your changes are saved offline. Sync now when you have internet
        </HMAText>
        <HMADivider space={'md'} />
        {new Array(10).fill(0).map((_, i) => (
          <SeparateRecord key={i} />
        ))}
      </ScrollView>
    </Container>
  );
}

const SeparateRecord = () => {
  return (
    <>
      <HMAText variant="title">Employee Name</HMAText>
      <HMADivider />
      <View style={[cStyle.row]}>
        <HMABadge color="error" size="sm" label={'20/10/2020'} />
        <HMADivider variant="vertical" />
        <HMABadge color="success" size="sm" label={'Mode: CheckIn'} />
      </View>
      <HMADivider thickness={1} color="lightBackground" space={'md'} />
    </>
  );
};

const style = StyleSheet.create({
  syncRound: {
    height: 200,
    width: 200,
    borderRadius: 200,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 20,
    borderWidth: 2,
    alignSelf: 'center',
  },
});
