import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ATTENDANCE_MODE } from 'src/utils/variables';

export default function useAttendanceMode() {
  const [mode, setModeState] = useState({
    label: 'Check In',
    value: 'check-in',
  });

  const setMode = (val: any) => {
    setModeState(val);
    AsyncStorage.setItem(ATTENDANCE_MODE, JSON.stringify(val));
  };

  useEffect(() => {
    const load = async () => {
      let mode = await AsyncStorage.getItem(ATTENDANCE_MODE);
      if (mode) {
        mode = JSON.parse(mode);
        setModeState(mode);
      }
    };
    load();
  }, []);

  return {
    mode,
    setMode,
  };
}
