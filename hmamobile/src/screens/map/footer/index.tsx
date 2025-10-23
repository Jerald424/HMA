import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAModalTemplate from 'src/components/styled/template/modal';
import HMAAlert from 'src/components/styled/template/modal/alert';
import { blendWithWhite } from 'src/function/colorCorrection';
import { useTheme } from 'src/hooks/useTheme';
import { spacing } from 'src/theme/spacing';
import Timer from './timer';
import useFooter from './useFooter';
import { formateDate } from 'src/function/dateConversion';
import { useMemo } from 'react';

export default function FooterBtn({
  userLocation,
}: {
  userLocation: { longitude: number; latitude: number };
}) {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const {
    matchedOffice,
    onAttendance,
    isPending,
    modalType,
    setModalType,
    alertRef,
    isCheckIn,
    lastAttendanceRecord,
  } = useFooter({ userLocation });

  const formatDt = useMemo(
    () => formateDate(lastAttendanceRecord?.date),
    [lastAttendanceRecord],
  );

  return (
    <>
      <HMAModalLoader isVisible={isPending} />
      <View
        style={[
          {
            paddingBottom: bottom,
            padding: spacing.md,
          },
        ]}
      >
        <Timer />
        <HMADivider />
        <HMAText align="center">
          Current Status:{' '}
          <HMAText variant="title" color={isCheckIn ? 'success' : 'error'}>
            {isCheckIn ? 'Check In' : 'Check Out'}
          </HMAText>
        </HMAText>
        <HMADivider />
        {isCheckIn && (
          <HMAText align="center" color="textSecondary">
            Check In Time: {formatDt?.date} {formatDt?.time}
          </HMAText>
        )}
        <HMADivider />
        {!!matchedOffice ? (
          <HMAButton
            onPress={() => setModalType(isCheckIn ? 'out' : 'in')}
            style={{ borderRadius: 50 }}
            leftIcon={isCheckIn ? 'exit' : 'enter'}
            title={`CHECK ${isCheckIn ? 'OUT' : 'IN'}`}
            color={isCheckIn ? 'error' : 'success'}
          ></HMAButton>
        ) : (
          <View
            style={{
              backgroundColor: blendWithWhite(colors.error, 0.8),
              padding: spacing.xs,
            }}
          >
            <HMAText align="center" size="small" color="error" variant="large">
              You are not currently at your work location. Attendance is only
              allowed at your assigned work location.
            </HMAText>
          </View>
        )}
      </View>
      <HMAModalTemplate
        isVisible={!!modalType}
        descriptionProps={{
          children: `Are you sure do you want to check ${
            modalType == 'in' ? 'in' : 'out'
          } to the ${matchedOffice?.name} office?`,
        }}
        cancelTextProps={{
          onPress: () => setModalType(''),
        }}
        okTextProps={{
          onPress: onAttendance,
        }}
      />
      <HMAAlert ref={alertRef} />
    </>
  );
}
