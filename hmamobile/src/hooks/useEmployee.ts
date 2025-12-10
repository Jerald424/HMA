import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';
import FaceNet from 'src/native/FaceNet';
import axiosInstance from 'src/services/axiosInstance';
import { BASE_URL } from 'src/utils/variables';

const fetchEmployee = async () => {
  const response = await axiosInstance.get('api/employee-list', {
    timeout: 0,
  });
  const domain = await AsyncStorage.getItem(BASE_URL);
  return response?.map(res => {
    delete res['image'];
    Object.assign(res, { imageUrl: `${domain}${res?.url}` });
    delete res['url'];
    return res;
  });
};

export const ITEM_PER_INIT = 5;

export default function useEmployee() {
  const [isInitProgress, setInitProgress] = useState(false);
  const { data, isPending, error } = useQuery({
    queryKey: ['fetch/employee'],
    queryFn: fetchEmployee,
  });

  console.log('data: ', data);

  const onSync = async (arg: { start: number }) => {
    try {
      setInitProgress(true);
      console.log('INIT START');
      const emp = data?.slice?.(arg?.start, arg?.start + ITEM_PER_INIT);
      console.log('emp: ', emp);
      await FaceNet.initializeEmployees(emp);
      console.log('INIT END');

      setInitProgress(false);
    } catch (error) {
      setInitProgress(false);

      console.error(error);
      Alert.alert('Error while init', JSON.stringify(error));
    }
  };

  return {
    onSync,
    isInitProgress,
    isPending,
    employee: data,
  };
}
