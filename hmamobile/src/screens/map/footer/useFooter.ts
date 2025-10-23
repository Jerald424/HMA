import { useMutation } from '@tanstack/react-query';
import attendanceEntryApi from '../api/attendanceEntryApi';
import { useMemo, useRef, useState } from 'react';
import { useUserInfo } from 'src/redux/hooks';
import isInsideGeofence from 'src/function/findUserInsideGeoLocation';
import { makeColonDate } from 'src/function/dateConversion';
import { alertRefProp } from 'src/components/styled/template/modal/alert';
import useLastAttendanceRecord from '../hooks/useLastAttendanceRecord';

export default function useFooter({
  userLocation,
}: {
  userLocation: { longitude: number; latitude: number };
}) {
  const { data: userInfo } = useUserInfo();
  const [modalType, setModalType] = useState('');
  const alertRef = useRef<alertRefProp>(null);
  const { data: lastAttendanceRecord } = useLastAttendanceRecord();

  const { mutate: markAttendance, isPending } = useMutation({
    mutationKey: ['mark/attendance'],
    mutationFn: attendanceEntryApi,
  });

  const isCheckIn = lastAttendanceRecord?.type == 'in';

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

  return {
    onAttendance,
    matchedOffice,
    isPending,
    modalType,
    setModalType,
    alertRef,
    isCheckIn,
    lastAttendanceRecord,
  };
}
