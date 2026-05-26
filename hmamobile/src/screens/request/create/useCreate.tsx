import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toastRefFn } from 'src/components/styled/atoms/toast';
import { formDataProps } from 'src/components/styled/organism/form';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

// {
// 		“Employee_id”: 20,
// 		“Request_type_id”: “RT-04”,
// 		“Form_data”: {
// 	“Amount”: 5000,
// 	“Reason”: “Medical Emergency”,
// 	“Repayment_months”: 5
// }
// }

const requestSubmit = async data => {
  console.log('data: ', data);
  return await axiosInstance.post(`/api/requests/submit`, data);
};

const requestTypes = async () => {
  return await axiosInstance.get('/api/requests/types');
};

export default function useCreate() {
  const id = useUserId();
  const navigation = useNavigation();
  const { control, handleSubmit, reset, watch } = useForm();
  const toastRef = useRef<toastRefFn>(null);
  const { mutate: leaveRequestMutation, isPending: isLoadingLeaveRequest } =
    useMutation({
      mutationKey: ['request/submit'],
      mutationFn: requestSubmit,
    });

  const { data: requestTypesData, isPending: isLoadingRequestType } = useQuery({
    queryKey: ['fetch/request-type'],
    queryFn: requestTypes,
  });

  const formData: formDataProps = [
    {
      inputType: 'drop-down',
      name: 'request_type_id',
      dropdownProps: {
        placeholder: 'Select request Type',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Select request Type',
        },
        options: requestTypesData?.types,
        optionalLabel: 'name',
        optionalValue: 'id',
      },
      rules: {
        required: {
          value: true,
          message: 'Request type is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'amount',
      textInputProps: {
        keyboardType: 'number-pad',
        placeholder: 'Enter Amount',
      },
      rules: {
        required: {
          value: true,
          message: 'Amount is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'reason',
      textInputProps: {
        placeholder: 'Enter reason',
      },
      rules: {
        // required: {
        //   value: true,
        //   message: 'Reason is required',
        // },
      },
    },
  ];

  const onSubmit = data => {
    leaveRequestMutation(
      {
        ...data,
        request_type_id: data?.request_type_id?.id,
        employee_id: id,
        form_data: {
          amount: data?.amount,
          purpose: data?.reason,
          repayment_months: data?.repayment_months,
        },
      },
      {
        onSuccess(data) {
          toastRef?.current?.showToast?.(
            data?.message || 'Something went wrong',
            'success',
          );
          console.log('data: ', data);
          navigation?.goBack();
        },
        onError(error) {
          toastRef?.current?.showToast?.(
            error?.message || 'Something went wrong',
            'error',
          );
          console.log('ERROR: ', error);
        },
      },
    );
  };

  return {
    formData,
    control,
    handleSubmit: handleSubmit(onSubmit),
    toastRef,
    isLoading: isLoadingLeaveRequest,
  };
}
