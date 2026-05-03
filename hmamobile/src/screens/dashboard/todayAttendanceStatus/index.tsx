import { View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useAuth } from 'src/redux/hooks';

export default function TodayAttendanceStatus() {
  const { colors, spacing, metrics } = useTheme();
  const { dashboard } = useAuth();
  const todayAttendance = dashboard?.data?.dashboard?.attendance?.today;
  const attStatus = !!todayAttendance?.check_in
    ? 'Check In'
    : !!todayAttendance?.check_out
    ? 'Check Out'
    : 'Not Marked';

  return (
    <HMACard style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}>
      <HMAText color="textSecondary">Today Attendance Status</HMAText>
      <HMADivider thickness={1} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <HMAText
          color={!!todayAttendance?.check_in ? 'success' : 'error'}
          size="title"
          style={{ flex: 1 }}
        >
          {attStatus || ' _'}
        </HMAText>
        <View style={{ flexDirection: 'row' }}>
          <HMAText>
            in: {todayAttendance?.check_in || '-'} {'  '}
          </HMAText>
          <HMAText>out: {todayAttendance?.check_out || '-'}</HMAText>
        </View>
      </View>
    </HMACard>
  );
}
