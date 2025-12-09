import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import axiosInstance from 'src/services/axiosInstance';
import isEmpty from 'lodash/isEmpty';
import FaceNet from 'src/native/FaceNet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from 'src/utils/variables';

const fetchEmployee = async () => {
  const response = await axiosInstance.get('api/employee-list', {
    timeout: 0,
  });
  return response;
};

export default function useEmployee() {
  const { data, isPending } = useQuery({
    queryKey: ['fetch/employee'],
    queryFn: fetchEmployee,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = [
          {
            id: 1,
            name: 'MANIKAN',
            imageUrl:
              'https://media.assettype.com/tnm%2Fimport%2Fsites%2Fdefault%2Ffiles%2FManikandan_171121_3_1200.jpg?w=1024&auto=format%2Ccompress&fit=max',
          },
        ];

        console.log('START INIT', 'TOKEN', await AsyncStorage.getItem(TOKEN));
        await FaceNet.initializeEmployees(data);
        console.log('INIT SUCCESSFUL');
      } catch (error) {
        console.error('ERROR WHILE INIT EMP: ', error);
      }
    };

    load();
  }, []);
}
