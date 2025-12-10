import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';
import { useAppContext } from 'src/App';
import { toastRefFn } from 'src/components/styled/atoms/toast';
import { makeColonDate } from 'src/function/dateConversion';
import useEmployeeData from 'src/hooks/useEmployee';
import useMarkAttendance from 'src/hooks/useMarkAttendance';
import FaceNet from 'src/native/FaceNet';
import { useAppDispatch } from 'src/redux/hooks';
import { fetchUserInfo } from 'src/redux/slices/auth/thunk';
import { LOCAL_ATTENDANCE_RECORD } from 'src/utils/variables';

export default function useLanding() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState({ label: 'Check In', value: 'check-in' });
  const { isConnected } = useAppContext();
  const [topMatch, setTopMatch] = useState([]);
  const [localRecord, setLocalRecord] = useState([]);
  const toastRef = useRef<toastRefFn>(null);
  const [isMatching, setIsMatching] = useState(false);

  const { isInitProgress, isPending, onSync, employee } = useEmployeeData();
  const { isLoadingMark, onMarkAttendance } = useMarkAttendance();

  const showToast = (message: string) => {
    toastRef?.current?.showToast?.(message);
  };

  const removeLocalRecord = (emp: any) => {
    try {
      const updated = [...localRecord];
      const index = updated?.findIndex(
        rec =>
          rec?.employee_id == emp?.employee_id &&
          rec?.timestamp == emp?.timestamp,
      );
      if (index !== -1) {
        updated.splice(index, 1);
        setLocalRecord(updated);
        AsyncStorage.setItem(LOCAL_ATTENDANCE_RECORD, JSON.stringify(updated));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFailureLocalRecord = (emp: any) => {
    try {
      const updated = [...localRecord];
      const index = updated?.findIndex(
        rec =>
          rec?.employee_id == emp?.employee_id &&
          rec?.timestamp == emp?.timestamp,
      );
      if (index !== -1) {
        const rem = updated.splice(index, 1);
        updated?.push(...rem);
        setLocalRecord(updated);
        AsyncStorage.setItem(LOCAL_ATTENDANCE_RECORD, JSON.stringify(updated));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onMatch = async (emp: any) => {
    setTopMatch([]);
    const payload = {
      employee_id: emp?.employee_id ?? emp?.id,
      type: emp?.type ?? mode?.value,
      date: emp?.date ?? makeColonDate(new Date()),
      name: emp?.name,
      timestamp: emp?.timestamp ?? String(Date.now()),
    };
    if (isConnected)
      onMarkAttendance(payload, {
        onSuccess() {
          showToast(`${emp?.name} ${mode?.label} successfully`);
          removeLocalRecord(payload);
        },
        onError() {
          onFailureLocalRecord(payload);
        },
      });
    else {
      showToast('Record stored locally');
      const updated = localRecord;
      updated?.push(payload);
      setLocalRecord(updated);
      await AsyncStorage.setItem(
        LOCAL_ATTENDANCE_RECORD,
        JSON.stringify(updated),
      );
    }
  };

  const onAttendance = async (photo?: PhotoFile) => {
    try {
      if (photo) {
        setIsMatching(true);
        console.log('MATCH START');
        const matches = await FaceNet.compareCapturedFace(photo?.path, 5);
        setIsMatching(false);

        console.log('MATCH COMPLETE');
        if (matches && matches?.length > 0) {
          if (matches?.[0]?.score >= 0.6) onMatch(matches?.[0]);
          else setTopMatch(matches);
        } else showToast('No match found');
      }
    } catch (error) {
      setIsMatching(false);

      console.error(error);
      toastRef?.current?.showToast?.(error?.message, 'error');
    }
  };

  const contextValue = {
    onAttendance,
    mode,
    setMode,
    isInitProgress,
    isPending,
    onSync,
    employee,
    localRecord,
    setLocalRecord,
    onMatch,
    isLoadingMark,
  };

  const loadLocalAttendance = async () => {
    try {
      let record = await AsyncStorage.getItem(LOCAL_ATTENDANCE_RECORD);
      if (record) {
        record = JSON.parse(record);
        setLocalRecord(record);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
    loadLocalAttendance();
  }, []);

  return {
    contextValue,
    onMatch,
    topMatch,

    toastRef,
    localRecord,
    isLoadingAttendance: isLoadingMark || isMatching,
  };
}
