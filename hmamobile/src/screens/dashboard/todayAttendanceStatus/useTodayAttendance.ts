import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import isInsideGeofence from 'src/function/findUserInsideGeoLocation';
import { useUserInfo } from 'src/redux/hooks';
import axiosInstance from 'src/services/axiosInstance';
import { ProjectSelectionRefProp } from './projectSelection';

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

  const { data: lastAttendanceRecord } = useQuery({
    queryKey: ['today/attendance'],
    queryFn: fetchLastAttendanceRecord,
  });

  const isCheckIn =
    !!lastAttendanceRecord?.result?.records?.[0]?.check_in &&
    !lastAttendanceRecord?.result?.records?.[0]?.check_out;

  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  const matchedOffice = useMemo(() => {
    try {
      let ofc = userInfo?.result?.data?.geofence_info?.offices;
      return [ofc?.[0], ofc?.[1]];
      return ofc?.find(office =>
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

  const isInsideGeofence = matchedOffice?.length > 0;

  const handleCheckInOut = () => {
    projectSelectionRef?.current?.onCheckInOut(isCheckIn ? 'out' : 'in');
  };

  return {
    setUserLocation,
    matchedOffice,
    isCheckIn,
    isInsideGeofence,
    handleCheckInOut,
    projectSelectionRef,
  };
}
