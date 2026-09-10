import { TouchableOpacity, View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import withGPS from 'src/hoc/withGps';
import { useTheme } from 'src/hooks/useTheme';
import { useAuth } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';
import Status from './status';
import { useEffect } from 'react';
import { checkLocationEnabled } from 'src/function/locationPermission';
import useTodayAttendance from './useTodayAttendance';
import HMAButton from 'src/components/styled/atoms/button';
import ProjectSelection from './projectSelection';

function TodayAttendanceStatus() {
  const { colors, spacing, metrics } = useTheme();
  const { dashboard } = useAuth();
  const {
    setUserLocation,
    isCheckIn,
    matchedOffice,
    isInsideGeofence,
    handleCheckInOut,
    projectSelectionRef,
  } = useTodayAttendance();

  const todayAttendance = dashboard?.data?.dashboard?.attendance?.today;
  const hasCheckedIn = !!todayAttendance?.check_in;
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

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLocationEnabled().then(location => {
        setUserLocation(location);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
        <View
          style={[
            cStyle.rowAlign,
            { gap: spacing.xs, marginBottom: spacing.sm },
          ]}
        >
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
        <Status
          desc="You are too far to check in"
          heading="1.2km from office"
          status="error"
        />
        <HMADivider />

        {/* Check in / Check out times */}
        <View
          style={[
            cStyle.rowAlign,
            { gap: spacing.lg, marginBottom: spacing.md },
          ]}
        >
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
        <HMAButton
          onPress={handleCheckInOut}
          size="sm"
          disabled={!isInsideGeofence}
          title={isCheckIn ? 'Check Out' : 'Check In'}
        ></HMAButton>
      </HMACard>
      <ProjectSelection
        matchedOffice={matchedOffice}
        ref={projectSelectionRef}
      />
    </>
  );
}

function Index() {
  return <TodayAttendanceStatus />;
}

export default withGPS(Index);
