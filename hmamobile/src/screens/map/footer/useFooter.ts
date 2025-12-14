import { useMutation } from '@tanstack/react-query';
import attendanceEntryApi from '../api/attendanceEntryApi';
import { useMemo, useRef, useState } from 'react';
import { useUserInfo } from 'src/redux/hooks';
import isInsideGeofence from 'src/function/findUserInsideGeoLocation';
import { makeColonDate } from 'src/function/dateConversion';
import { alertRefProp } from 'src/components/styled/template/modal/alert';
import useLastAttendanceRecord from '../hooks/useLastAttendanceRecord';
import isEmpty from 'lodash/isEmpty';
import useGeofenceRestriction from '../hooks/useGeofenceRestriction';
import { useModal } from 'react-native-modalfy';
import { faceVerifyRefProp } from 'src/components/layout/faceVerify';
import { IS_ANDROID } from 'src/utils/variables';

export default function useFooter({
  userLocation,
}: {
  userLocation: { longitude: number; latitude: number };
}) {
  const { data: userInfo } = useUserInfo();
  const [modalType, setModalType] = useState('');
  const alertRef = useRef<alertRefProp>(null);
  const officesRef = useRef(null);
  const { openModal, closeModal } = useModal();
  const faceVerifyRef = useRef<faceVerifyRefProp>(null);

  const {
    data: lastAttendanceRecord,
    refetch,
    isFetching: isLoadingLastAttendance,
  } = useLastAttendanceRecord();
  const {
    no_geofence_restriction,
    no_geofence_restriction_default_project_id,
  } = useGeofenceRestriction();

  const { mutate: markAttendance, isPending } = useMutation({
    mutationKey: ['mark/attendance'],
    mutationFn: attendanceEntryApi,
  });

  const isCheckIn = !!lastAttendanceRecord?.check_in;
  const isCheckOut = !!lastAttendanceRecord?.check_out;

  const isIn = !!!lastAttendanceRecord || isCheckOut;

  const matchedOffice = useMemo(() => {
    try {
      //NEED TO CHANGE
      // return userInfo?.offices?.[5];
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

  const isGeofenceEnabled =
    !isEmpty(matchedOffice) ||
    no_geofence_restriction ||
    no_geofence_restriction_default_project_id;

  const afterVerify = () => {
    if (no_geofence_restriction || no_geofence_restriction_default_project_id)
      officesRef?.current?.open?.();
    else if (!!matchedOffice) setModalType(isIn ? 'in' : 'out');
  };

  const onPress = () => {
    if (userInfo?.isFaceVerify && IS_ANDROID) {
      faceVerifyRef?.current?.onVerify?.();
      return;
    }
    afterVerify();
  };

  const onAttendance = (arg?: { project_id: number }) => {
    // arg = arg ?? {
    //   project_id: matchedOffice?.project?.id,
    //   latitude: userLocation?.latitude,
    //   longitude: userLocation?.longitude,
    // };
    const payload = {
      type: isIn ? 'in' : 'out',
      project_id: arg?.project_id ?? matchedOffice?.project?.id,
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      date: makeColonDate(new Date()),
      mode: 'manual',
    };
    setModalType('');
    console.log('payload: ', payload);
    openModal('Loader');
    markAttendance(
      { payload },
      {
        onSuccess(data) {
          console.log('DATA: ', data);
          alertRef?.current?.showAlert?.({
            variant: 'success',
            message: `Check ${isIn ? 'in' : 'out'} successfully`,
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
        onSettled() {
          refetch();
          closeModal('Loader');
        },
      },
    );
  };

  return {
    onAttendance,
    matchedOffice,

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
    faceVerifyRef,
    afterVerify,
  };
}
