import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import isInsideGeofenceFn from 'src/function/findUserInsideGeoLocation';
import { useUserInfo } from 'src/redux/hooks';
import axiosInstance from 'src/services/axiosInstance';
import { ProjectSelectionRefProp } from './projectSelection';
import { formateDate, formatToShortDate } from 'src/function/dateConversion';

// “Params”:{
// 	“Limit”: 20,
// 	“Date_from”: “02/09/2026”,
// 	“Date_to”: ”02/09/2026”,
// 	“Project_id”: 1441
// }

const fetchLastAttendanceRecord = async () => {
  return await axiosInstance.post('/api/employee/attendance/list', {
    params: {
      limit: 1,
    },
  });
};

export default function useTodayAttendance() {
  const { data: userInfo } = useUserInfo();
  const projectSelectionRef = useRef<ProjectSelectionRefProp>(null);

  const { data: lastAttendanceRecord, refetch: refetchLastAttendance } =
    useQuery({
      queryKey: ['today/attendance'],
      queryFn: fetchLastAttendanceRecord,
    });

  const lastAttRecord = lastAttendanceRecord?.result?.records?.[0];
  const isCheckIn = !!lastAttRecord?.check_in && !lastAttRecord?.check_out;
  const isCheckOut = lastAttRecord?.check_out;

  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  const matchedOffice = useMemo(() => {
    try {
      let ofc = userInfo?.result?.data?.geofence_info?.offices;
      // return [ofc?.[0]];
      return ofc?.find(office =>
        isInsideGeofenceFn(
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

  const isInsideGeofence = matchedOffice?.length > 0;

  const handleCheckInOut = () => {
    projectSelectionRef?.current?.onCheckInOut(isCheckIn ? 'out' : 'in');
  };

  const checkInOutTime = useMemo(() => {
    try {
      const [checkIn, checkOut] = [
        lastAttRecord?.check_in?.split(' '),
        lastAttRecord?.check_out?.split(' '),
      ];
      const isSameDay =
        !lastAttRecord?.check_out || checkIn?.[0] === checkOut?.[0];
      const [formattedCheckIn, formattedCheckOut] = [
        formateDate(lastAttRecord?.check_in),
        formateDate(lastAttRecord?.check_out),
      ];
      return {
        check_in_time: formattedCheckIn?.time,
        check_out_time: formattedCheckOut?.time,
        isSameDay,
        check_in_date: formatToShortDate(checkIn?.[0]),
        check_out_date: formatToShortDate(checkOut?.[0]),
      };
    } catch (error) {
      console.log('ERROR IN TIME: ', error);
    }
  }, [lastAttRecord]);

  console.log('checkInOutTime: ', checkInOutTime);

  return {
    setUserLocation,
    matchedOffice,
    isCheckIn,
    isInsideGeofence,
    handleCheckInOut,
    projectSelectionRef,
    refetchLastAttendance,
    lastAttRecord,
    checkInOutTime,
    isCheckOut,
  };
}
