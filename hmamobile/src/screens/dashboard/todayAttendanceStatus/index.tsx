import { TouchableOpacity, View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useAuth } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function TodayAttendanceStatus() {
  const { colors, spacing, metrics } = useTheme();
  const { dashboard } = useAuth();

  const todayAttendance = dashboard?.data?.dashboard?.attendance?.today;
  const hasCheckedIn  = !!todayAttendance?.check_in;
  const hasCheckedOut = !!todayAttendance?.check_out;

  const statusLabel = hasCheckedIn
    ? hasCheckedOut
      ? 'Completed'
      : 'Checked In'
    : 'Not Marked Yet';

  const statusColor = hasCheckedIn ? colors.success : colors.error;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <HMACard style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}>

      {/* Title + date row */}
      <View style={[cStyle.rowAlign, { justifyContent: 'space-between' }]}>
        <HMAText
          color="textSecondary"
          size="small"
          style={{ textTransform: 'uppercase', letterSpacing: 0.6 }}
        >
          Today's Attendance
        </HMAText>
        <HMAText color="textSecondary" size="small">
          {today}
        </HMAText>
      </View>

      <HMADivider thickness={1} />

      {/* Status dot + label */}
      <View style={[cStyle.rowAlign, { gap: spacing.xs, marginBottom: spacing.sm }]}>
        <View
          style={{
            width: 9,
            height: 9,
            borderRadius: 99,
            backgroundColor: statusColor,
          }}
        />
        <HMAText size="title" style={{ color: statusColor }}>
          {statusLabel}
        </HMAText>
      </View>

      {/* Check in / Check out times */}
      <View style={[cStyle.rowAlign, { gap: spacing.lg, marginBottom: spacing.md }]}>
        <View>
          <HMAText color="textSecondary" size="small">
            Check In
          </HMAText>
          <HMAText size="regular" style={{ fontWeight: '600' }}>
            {todayAttendance?.check_in || '—  :  —'}
          </HMAText>
        </View>
        <View>
          <HMAText color="textSecondary" size="small">
            Check Out
          </HMAText>
          <HMAText size="regular" style={{ fontWeight: '600' }}>
            {todayAttendance?.check_out || '—  :  —'}
          </HMAText>
        </View>
      </View>

      {/* Action buttons — hidden after both are done */}
      {!hasCheckedOut && (
        <View style={[cStyle.row, { gap: spacing.sm }]}>
          <TouchableOpacity
            disabled={hasCheckedIn}
            style={{
              flex: 1,
              backgroundColor: hasCheckedIn ? colors.lightBackground : colors.title,
              borderRadius: metrics.radius.md,
              paddingVertical: spacing.sm,
              alignItems: 'center',
            }}
          >
            <HMAText
              size="small"
              style={{
                fontWeight: '600',
                color: hasCheckedIn ? colors.textSecondary : colors.background,
              }}
            >
              ⏱  Check In
            </HMAText>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!hasCheckedIn}
            style={{
              flex: 1,
              backgroundColor: hasCheckedIn ? colors.title : colors.lightBackground,
              borderRadius: metrics.radius.md,
              paddingVertical: spacing.sm,
              alignItems: 'center',
              borderWidth: hasCheckedIn ? 0 : 0.5,
              borderColor: colors.border,
            }}
          >
            <HMAText
              size="small"
              style={{
                fontWeight: '600',
                color: hasCheckedIn ? colors.background : colors.textSecondary,
              }}
            >
              Check Out
            </HMAText>
          </TouchableOpacity>
        </View>
      )}
    </HMACard>
  );
}
