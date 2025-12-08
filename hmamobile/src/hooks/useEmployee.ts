import { useEffect } from 'react';
import { insertEmployees } from 'src/database/insertEmployees';
import { loadBigData, saveBigData } from 'src/function/writeData';
import { employeesListApi } from 'src/redux/slices/employee/api';
import { KIOSK_EMPLOYEE_DATA } from 'src/utils/variables';

export let employees = null;

export default function useEmployeeData() {
  const fetch = async () => {
    // loadBigData(KIOSK_EMPLOYEE_DATA).then(localData => {
    //   if (localData) employees = localData;
    // });
    // employeesListApi().then(data => {
    //   employees = data;
    //   saveBigData(data, KIOSK_EMPLOYEE_DATA);
    // });
    employeesListApi().then(data => {
      insertEmployees(data);
    });
  };

  useEffect(() => {
    fetch();
  }, []);
}
