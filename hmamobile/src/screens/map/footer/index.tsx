import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HMADivider from 'src/components/styled/atoms/divider';
import HMALoader from 'src/components/styled/atoms/loader';
import HMAText from 'src/components/styled/atoms/text';
import HMAModalTemplate from 'src/components/styled/template/modal';
import HMAAlert from 'src/components/styled/template/modal/alert';
import { blendWithWhite } from 'src/function/colorCorrection';
import { convertUserTimeZone } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { spacing } from 'src/theme/spacing';
import { cStyle } from 'src/utils/style';
import InOutButton from './components/inOutButton';
import OfficeList from './officeList';
import Timer from './timer';
import useFooter from './useFooter';

export default function FooterBtn({
  userLocation,
}: {
  userLocation: { longitude: number; latitude: number };
}) {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const { data: userInfo } = useUserInfo();

  const {
    matchedOffice,
    onAttendance,
    modalType,
    setModalType,
    alertRef,
    isCheckIn,
    lastAttendanceRecord,
    isCheckOut,
    isLoadingLastAttendance,
    isGeofenceEnabled,
    isIn,
    onPress,
    officesRef,
  } = useFooter({ userLocation });

  const formatDt = useMemo(
    () =>
      convertUserTimeZone({
        date: lastAttendanceRecord?.check_in,
        timeZone: userInfo?.Timezone,
      }),
    [lastAttendanceRecord],
  );

  return (
    <>
      <View
        style={[
          {
            paddingBottom: bottom + spacing.sm,
            padding: spacing.md,
          },
        ]}
      >
        <Timer />
        <HMADivider />
        {isLoadingLastAttendance ? (
          <View style={[{ height: 80 }, cStyle.rowJustify]}>
            <HMALoader size="large" />
          </View>
        ) : (
          <>
            {lastAttendanceRecord && (
              <HMAText align="center">
                Current Status:{' '}
                <HMAText
                  variant="title"
                  color={isCheckOut ? 'error' : 'success'}
                >
                  {isCheckOut ? 'Check Out' : 'Check In'}
                </HMAText>
              </HMAText>
            )}
            <HMADivider />
            {isCheckIn && !isCheckOut && (
              <HMAText align="center" color="textSecondary">
                Check In Time: {formatDt?.date} {formatDt?.time}
              </HMAText>
            )}
            <HMADivider />
            {!!isGeofenceEnabled ? (
              <InOutButton
                isIn={isIn}
                disabled={isEmpty(userLocation)}
                onPress={onPress}
              ></InOutButton>
            ) : (
              <View
                style={{
                  backgroundColor: blendWithWhite(colors.error, 0.8),
                  padding: spacing.xs,
                }}
              >
                <HMAText
                  align="center"
                  size="small"
                  color="error"
                  variant="large"
                >
                  You are not currently at your work location. Attendance is
                  only allowed at your assigned work location.
                </HMAText>
              </View>
            )}
          </>
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
          onPress: () => onAttendance(),
        }}
      />
      <HMAAlert ref={alertRef} />
      <OfficeList
        officesRef={officesRef}
        matchedOffice={matchedOffice}
        isIn={isIn}
        onAttendance={onAttendance}
      />
    </>
  );
}
