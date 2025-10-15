import { useMutation } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAModalTemplate from 'src/components/styled/template/modal';
import isInsideGeofence from 'src/function/findUserInsideGeoLocation';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';
import attendanceEntryApi from './api/attendanceEntryApi';
import { makeColonDate } from 'src/function/dateConversion';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAAlert, {
  alertRefProp,
} from 'src/components/styled/template/modal/alert';
import { spacing } from 'src/theme/spacing';

export default function FooterBtn({
  userLocation,
}: {
  userLocation: { longitude: number; latitude: number };
}) {
  const { bottom } = useSafeAreaInsets();
  const [modalType, setModalType] = useState('');
  const { data: userInfo } = useUserInfo();
  const alertRef = useRef<alertRefProp>(null);

  const { mutate: markAttendance, isPending } = useMutation({
    mutationKey: ['mark/attendance'],
    mutationFn: attendanceEntryApi,
  });

  const matchedOffice = useMemo(() => {
    try {
      return userInfo?.offices?.find(office =>
        isInsideGeofence(
          {
            latitude: office?.lat,
            longitude: office?.long,
            radius: office?.radius,
          },
          userLocation?.latitude,
          userLocation?.longitude,
        ),
      );
    } catch (error) {}
  }, [userLocation, userInfo]);

  const onAttendance = () => {
    const payload = {
      type: modalType,
      project_id: matchedOffice?.project?.id,
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      date: makeColonDate(new Date()),
      mode: 'manual',
    };
    setModalType('');

    markAttendance(
      { payload },
      {
        onSuccess(data) {
          console.log('data: ', data);
          alertRef?.current?.showAlert?.({
            variant: 'success',
            message: `Check ${modalType == 'in' ? 'in' : 'out'} successfully`,
            title: 'Success',
          });
        },
        onError(error) {
          console.log('error: ', error);
          alertRef?.current?.showAlert?.({
            variant: 'error',
            message: error?.Message ?? 'Something went wrong',
            title: 'Oops!',
          });
        },
      },
    );
  };

  return (
    <>
      <HMAModalLoader isVisible={isPending} />
      <View
        style={[
          {
            position: 'absolute',
            bottom: bottom + spacing.md,
            left: 0,
            right: 0,
            justifyContent: 'center',
          },
          cStyle.row,
        ]}
      >
        <HMAButton
          disabled={!!!matchedOffice}
          onPress={() => setModalType('in')}
          style={{ borderRadius: 50 }}
          leftIcon="enter"
          title="CHECK IN "
          color="success"
        ></HMAButton>
        <HMADivider variant="vertical" />
        <HMAButton
          disabled={!!!matchedOffice}
          onPress={() => setModalType('out')}
          style={{ borderRadius: 50 }}
          leftIcon="exit"
          title="CHECK OUT"
          color="error"
        ></HMAButton>
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
