import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toastRefFn } from 'src/components/styled/atoms/toast';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

// Advance Salary Request
// POST - /api/employee/{int:employee_id}/salay–advance
// Description - Submit a salary advance request

// Body:
// {
// 	“Advance”: 1500.0,                  // required, > 0
// 	“Date”: “2026-09-16”,               // Optional, defaults to today date
// 	“Reason”: “Medical expense”   // Optional
// }

const createAdvanceSalaryRequest = async ({
  employee_id,
  payload,
}: {
  payload: any;
  employee_id: number;
}) => {
  const response = await axiosInstance.post(
    `/api/employee/${employee_id}/salary-advance`,
    payload,
  );
  return response;
};

export default function useDetail() {
  const navigation = useNavigation();
  const userId = useUserId();
  const [state, setState] = useState({ advance: '', reason: '' });
  const toastRef = useRef<toastRefFn>(null);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create/advance-salary'],
    mutationFn: createAdvanceSalaryRequest,
  });

  const handleRequest = () => {
    mutate(
      { employee_id: userId, payload: state },
      {
        onSuccess(data) {
          toastRef.current?.showToast?.(data?.message || 'Ok', 'success');
          queryClient.invalidateQueries({
            queryKey: ['fetch/advance-salary', userId],
          });
          navigation.goBack();
          console.log('adv: data: ', data);
        },
        onError(error) {
          toastRef.current?.showToast?.(
            error?.message || 'Something went wrong',
            'error',
          );
        },
      },
    );
  };

  return {
    state,
    setState,
    handleRequest,
    isPending,
    isOpenConfirmation,
    setIsOpenConfirmation,
    toastRef,
  };
}
