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
  const response = await axiosInstance.post('/api/mark-attendance', payload);
  return response;
};

export default function useMarkAttendance() {
  const { mutate: onMarkAttendance, isPending } = useMutation({
    mutationKey: ['mark/attendance'],
    mutationFn: markAttendanceApi,
  });

  return {
    onMarkAttendance,
    isLoadingMark: isPending,
  };
}
