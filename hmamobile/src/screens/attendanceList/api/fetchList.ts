import axiosInstance from 'src/services/axiosInstance';
import { initialAttendanceFilter } from '..';
import {
  getRangeForPeriod,
  jsDateToDDMMYYYY,
} from 'src/function/dateConversion';

type fetchAttendanceProps = {
  offset: number;
} & typeof initialAttendanceFilter;
export const LIMIT = 10;

//{{baseURL}}/attendance-list?offset=0&limit=10&date-from=10/10/2025&date-to=25/10/2025&project_id=555

export default function fetchAttendanceApi({
  offset,
  date,
  project_id,
}: fetchAttendanceProps) {
  let url = `/attendance-list?offset=${offset}&limit=${LIMIT}&`;

  if (date == 'today') {
    const dt = jsDateToDDMMYYYY(new Date());
    url += `date-from=${dt}&date-to=${dt}&`;
  } else if (!!date) {
    const { start, end } = getRangeForPeriod(date);
    url += `date-from=${start}&date-to=${end}&`;
  }

  if (!!project_id) url += `project_id=${project_id}`;
  console.log('url: ', url);
  return axiosInstance.get(url);
}
