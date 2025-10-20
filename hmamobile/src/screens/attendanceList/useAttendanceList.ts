import { useEffect, useState } from 'react';
import axiosInstance from 'src/services/axiosInstance';

const LIMIT = 10;
export default function useAttendanceList() {
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalRec, setTotalRec] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const IS_ALL_RECORD_FETCHED = list?.length >= totalRec;

  const fetchAttendance = async ({ offset }: { offset: number }) => {
    setIsLoading(true);
    const url = `/attendance-list?offset=${offset}&limit=${LIMIT}`;
    axiosInstance
      .get(url)
      .then(res => {
        setTotalRec(res?.total_records); //res?.total_records
        setList(prev => [...prev, ...res?.records]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onEndReach = (arg?: { isInitial: boolean }) => {
    if ((IS_ALL_RECORD_FETCHED && !arg?.isInitial) || isLoading) return;
    const updatedOffset = arg?.isInitial ? 0 : offset + LIMIT;
    setOffset(updatedOffset);
    fetchAttendance({ offset: updatedOffset });
  };

  useEffect(() => {
    onEndReach({ isInitial: true });
  }, []);

  return {
    onEndReach,
    list,
    isLoading,
  };
}
