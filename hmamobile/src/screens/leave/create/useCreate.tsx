import { useMutation } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toastRefFn } from 'src/components/styled/atoms/toast';
import { formDataProps } from 'src/components/styled/organism/form';
import { jsDateToYYYYMMDD } from 'src/function/dateConversion';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';
import { useFetchLeaveBalance } from '../list/useLeaveList';
import { useNavigation } from '@react-navigation/native';

const leave_types = [
  { label: 'Unpaid', value: 'Unpaid' },
  { label: 'Paid', value: 'Paid' },
];

const sessions = [
  { label: 'Morning', value: 'morning' },
  { label: 'Evening', value: 'evening' },
];

// { /api/leaves/request
// 	“Employee_id”: 20,
//   “Leave_type”: “Unpaid”,
// 	“Start_date”: “2026-05-05”,
// 	“End_date”: “2026-05-10”,
// }
//  {
//     headers: {
//       session_id:
//         '4e69b1fee8706ec56da8eca74c23e489f4ffe73203fc383d7c005b6930f69e1a',
//     },
//   }

const leaveRequest = async data => {
  console.log('data: ', data);
  delete data['Start_date'];
  delete data['End_date'];
  return await axiosInstance.post(`/api/leaves/request`, data);
};

export default function useCreate() {
  const navigation = useNavigation();
  const { isLoading, leaveBalance } = useFetchLeaveBalance();
  console.log('leaveBalance: ', leaveBalance);
  const leave_types = useMemo(() => {
    try {
      return leaveBalance?.balances?.map(leave => ({
        label: leave?.type,
        value: leave?.type,
      }));
    } catch (error) {
      console.error(error);
    }
  }, [leaveBalance]);

  const id = useUserId();
  const { control, handleSubmit, reset, watch } = useForm();
  const toastRef = useRef<toastRefFn>(null);
  const { mutate: leaveRequestMutation, isPending: isLoadingLeaveRequest } =
    useMutation({
      mutationKey: ['leave/request'],
      mutationFn: leaveRequest,
    });

  const [Start_date, End_date] = watch(['Start_date', 'End_date']);

  const dayDuration = useMemo(() => {
    if (!Start_date || !End_date) return 0;
    const start = new Date(Start_date);
    const end = new Date(End_date);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  }, [Start_date, End_date]);

  const formData: formDataProps = [
    {
      inputType: 'drop-down',
      name: 'Leave_type',
      dropdownProps: {
        placeholder: 'Leave Type',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Leave Type',
        },
        options: leave_types,
      },
      rules: {
        required: {
          value: true,
          message: 'Leave type is required',
        },
      },
    },
    {
      inputType: 'date-picker',
      name: 'Start_date',
      datePickerProps: {
        mode: 'date',
        label: 'Leave From',
      },
      textInputProps: {
        placeholder: 'Start date',
      },
      rules: {
        required: {
          value: true,
          message: 'Start date is required',
        },
      },
    },
    // {
    //   inputType: 'drop-down',
    //   name: 'start_session',
    //   dropdownProps: {
    //     placeholder: 'Select start session',
    //     searchTextInputProps: {
    //       autoCapitalize: 'none',
    //       placeholder: 'Select start session',
    //     },
    //     options: sessions,
    //   },
    //   rules: {
    //     required: {
    //       value: true,
    //       message: 'Start session is required',
    //     },
    //   },
    // },
    {
      inputType: 'date-picker',
      name: 'End_date',
      datePickerProps: {
        mode: 'date',
        label: 'Leave To',
      },
      rules: {
        required: {
          value: true,
          message: 'End date is required',
        },
        validate(endDate) {
          let s = new Date(Start_date);
          let e = new Date(endDate);
          s.setHours(0, 0, 0, 0);
          e.setHours(0, 0, 0, 0);
          return e >= s
            ? true
            : 'End date should be greater then are equal to start';
        },
        // min: {
        //   value: Start_date,
        //   message: 'End date should be greater then are equal to start',
        // },
      },
    },
    // {
    //   inputType: 'drop-down',
    //   name: 'end_session',
    //   dropdownProps: {
    //     placeholder: 'Select end session',
    //     searchTextInputProps: {
    //       autoCapitalize: 'none',
    //       placeholder: 'Select end session',
    //     },
    //     options: sessions,
    //   },
    //   rules: {
    //     required: {
    //       value: true,
    //       message: 'End session is required',
    //     },
    //   },
    // },
  ];

  const field2: formDataProps = [
    {
      inputType: 'input-box',
      name: 'reason',
      rules: {
        required: {
          value: true,
          message: 'Reason is required',
        },
      },
      textInputProps: {
        placeholder: 'Reason',
        multiline: true,
        style: {
          height: 80,
          textAlignVertical: 'top',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'home_contact_number',
      textInputProps: {
        placeholder: 'Home Contact Number',
        keyboardType: 'phone-pad',
        note: 'Required for labour employees applying annual leave. Optional for other leave types.',
      },
    },
    {
      inputType: 'input-box',
      name: 'airport_name',
      textInputProps: {
        placeholder: 'Airport Name',
      },
    },
    {
      inputType: 'attach',
      name: 'attach',
      textInputProps: {
        placeholder: 'Attachment',
      },
    },
  ];

  const onSubmit = data => {
    leaveRequestMutation(
      {
        ...data,
        start_date: jsDateToYYYYMMDD(data?.Start_date),
        end_date: jsDateToYYYYMMDD(data?.End_date),
        employee_id: id,
        leave_type: data?.Leave_type?.value,
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
    dayDuration,
    field2,
  };
}
