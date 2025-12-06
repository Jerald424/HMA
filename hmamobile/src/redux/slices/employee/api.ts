import axiosInstance from 'src/services/axiosInstance';

export async function employeesListApi() {
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$ START @@@@@@@@@@@@@@');
  const data = await axiosInstance.get('/api/employee-list', {
    timeout: 0,
  });

  console.log('END ####', data);
  return data?.[0];
}
