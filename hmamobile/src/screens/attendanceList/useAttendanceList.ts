import { useEffect, useState } from 'react';
import axiosInstance from 'src/services/axiosInstance';
import { initialAttendanceFilter } from '.';
import fetchAttendanceApi, { LIMIT } from './api/fetchList';

export default function useAttendanceList() {
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalRec, setTotalRec] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(initialAttendanceFilter);

  const IS_ALL_RECORD_FETCHED = list?.length >= totalRec;

  const fetchAttendance = async ({
    offset,
    isInitial,
  }: {
    offset: number;
    isInitial?: boolean;
  }) => {
    setIsLoading(true);

    fetchAttendanceApi({ offset, ...filters })
      .then(response => {
        setTotalRec(response?.total_record);
        setList(prev =>
          isInitial ? response?.records : [...prev, ...response?.records],
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onEndReach = (arg?: { isInitial: boolean }) => {
    if ((IS_ALL_RECORD_FETCHED && !arg?.isInitial) || isLoading) return;
    const updatedOffset = arg?.isInitial ? 0 : offset + LIMIT;
    setOffset(updatedOffset);
    fetchAttendance({ offset: updatedOffset, isInitial: arg?.isInitial });
  };

  useEffect(() => {
    onEndReach({ isInitial: true });
  }, [filters]);

  return {
    onEndReach,
    list,
    isLoading,
    filters,
    setFilters,
  };
}
