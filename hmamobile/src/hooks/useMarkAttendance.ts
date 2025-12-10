import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'src/services/axiosInstance';

/**
 * 
 * @param payload 
 * {
    "employee_id": 5284,
    "type": "check-in",
    "date": "05:12:2025 01:12:00"
}
 * @returns 
 */
const markAttendanceApi = async (payload: any) => {
  return axiosInstance.post('api/mark-attendance');
};

export default function useMarkAttendance() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['mark/attendance'],
    mutationFn: markAttendanceApi,
  });

  return {
    onMarkAttendance: mutate,
    isLoadingMark: isPending,
  };
}
