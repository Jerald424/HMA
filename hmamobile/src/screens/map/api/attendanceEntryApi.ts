import axiosInstance from 'src/services/axiosInstance';

export default async function attendanceEntryApi({ payload }) {
  //     {
  //     "type": "in",
  //     "date": "12:10:2025 18:00:00",
  //     "project_id": 3,
  //     "latitude": 18.5210,
  //     "longitude": 73.8570,
  //     "mode": "manual"
  // }

  return await axiosInstance.post('/mark-attendance', payload);
}
