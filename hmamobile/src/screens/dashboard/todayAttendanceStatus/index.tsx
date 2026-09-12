import { useEffect } from 'react';
import { View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { checkLocationEnabled } from 'src/function/locationPermission';
import withGPS from 'src/hoc/withGps';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import ProjectSelection from './projectSelection';
import Status from './status';
import useTodayAttendance from './useTodayAttendance';

function TodayAttendanceStatus() {
  const { colors, spacing, metrics } = useTheme();
  const {
    setUserLocation,
    isCheckIn,
    matchedOffice,
    isInsideGeofence,
    handleCheckInOut,
    projectSelectionRef,
    refetchLastAttendance,
    lastAttRecord,
    checkInOutTime,
    isCheckOut,
  } = useTodayAttendance();

  const statusLabel = isCheckOut
    ? 'Completed'
    : isCheckIn
    ? 'Checked In'
    : 'Not Marked Yet';

  const statusColor = isCheckIn || isCheckOut ? colors.success : colors.error;

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
          heading={
            isInsideGeofence
              ? 'Inside office zone'
              : "You're outside the office zone"
          }
          desc={
            isInsideGeofence
              ? `You can check ${isCheckIn ? 'out' : 'in'} now`
              : `You are too far to check ${isCheckIn ? 'out' : 'in'}`
          }
          status={isInsideGeofence ? 'success' : 'error'}
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
              {checkInOutTime?.check_in_time || '—  :  —'}
            </HMAText>
            {!checkInOutTime?.isSameDay && (
              <HMAText color="textSecondary" size="small">
                {checkInOutTime?.check_in_date}
              </HMAText>
            )}
          </View>
          <View>
            <HMAText color="textSecondary" size="small">
              Check Out
            </HMAText>
            <HMAText size="regular" style={{ fontWeight: '600' }}>
              {checkInOutTime?.check_out_time || '—  :  —'}
            </HMAText>
            {!checkInOutTime?.isSameDay && (
              <HMAText color="textSecondary" size="small">
                {checkInOutTime?.check_out_date}
              </HMAText>
            )}
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
        onSettled={refetchLastAttendance}
      />
    </>
  );
}

function Index() {
  return <TodayAttendanceStatus />;
}

export default withGPS(TodayAttendanceStatus);
