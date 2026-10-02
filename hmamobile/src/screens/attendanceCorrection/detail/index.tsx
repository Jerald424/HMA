import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import Toast, { toastRefFn } from 'src/components/styled/atoms/toast';
import HMAForm, { formDataProps } from 'src/components/styled/organism/form';
import {
  formatAttendanceDate,
  jsDateToDDMMYYYY,
} from 'src/function/dateConversion';
import axiosInstance from 'src/services/axiosInstance';

// POST - /api/employee/attendance/corrections/create

// Body:{
// 	// Optional
// 	“Params”:{
// 	“Attendance_date”: “29/09/2026”,
// 	“correction_type”: “incorrect_check_out”,
// 	“Reason”: “Phone died before checkout”,
// 	“check_in”: ”29/09/2026 09:02”,
// 	“check_out”: “29/09/2026 11:10”
// }
// }

const createAttendanceCorrection = async (params: any) => {
  return await axiosInstance.post(
    '/api/employee/attendance/corrections/create',
    { params },
  );
};

// POST - /api/employee/attendance/corrections/options

const getAttendanceCorrectionOptions = async () => {
  return await axiosInstance.post(
    '/api/employee/attendance/corrections/options',
    {
      params: {},
    },
  );
};

export default function AttendanceCorrectionDetail({ navigation, route }) {
  const queryClient = useQueryClient();
  const toastRef = useRef<toastRefFn>(null);

  const { watch, control, handleSubmit } = useForm();
  const [check_in] = watch(['check_in']);
  const { mutate, isPending } = useMutation({
    mutationKey: ['create/attendance-correction'],
    mutationFn: createAttendanceCorrection,
  });

  const {
    data: attendanceCorrectionOptions,
    isPending: isAttendanceCorrectionOptionsPending,
    error: attendanceCorrectionOptionsError,
  } = useQuery({
    queryKey: ['attendance-correction/options'],
    queryFn: getAttendanceCorrectionOptions,
  });

  const cTypes = attendanceCorrectionOptions?.result?.correction_types;

  const formData: formDataProps = [
    {
      inputType: 'drop-down',
      name: 'correction_type',
      dropdownProps: {
        placeholder: 'Correction Type',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Correction Type',
        },
        options: cTypes,
        optionalLabel: 'label',
        optionalValue: 'key',
      },
      rules: {
        required: {
          value: true,
          message: 'Correction type is required',
        },
      },
    },
    {
      inputType: 'date-picker',
      name: 'attendance_date',
      datePickerProps: {
        mode: 'date',
        label: 'Attendance Date',
      },
      rules: {
        required: {
          value: true,
          message: 'Attendance date is required',
        },
      },
    },
    {
      inputType: 'date-picker',
      name: 'check_in',
      datePickerProps: {
        mode: 'datetime',
        label: 'Check In',
      },
      textInputProps: {
        placeholder: 'Check in date',
      },
      rules: {
        required: {
          value: true,
          message: 'Check in date is required',
        },
      },
    },
    {
      inputType: 'date-picker',
      name: 'check_out',
      datePickerProps: {
        mode: 'datetime',
        label: 'Check Out',
      },
      rules: {
        required: {
          value: true,
          message: 'Check out date is required',
        },
        validate(check_out) {
          let s = new Date(check_in);
          let e = new Date(check_out);
          // s.setHours(0, 0, 0, 0);
          // e.setHours(0, 0, 0, 0);
          return e >= s
            ? true
            : 'Check out date should be greater than or equal to check in date';
        },
        // min: {
        //   value: check_in,
        //   message: 'Check out date should be greater than or equal to check in date',
        // },
      },
    },
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
  ];

  const onSubmit = (data: any) => {
    console.log('data: ', data);
    // 	“Params”:{
    // 	“Attendance_date”: “29/09/2026”,
    // 	“correction_type”: “incorrect_check_out”,
    // 	“Reason”: “Phone died before checkout”,
    // 	“check_in”: ”29/09/2026 09:02”,
    // 	“check_out”: “29/09/2026 11:10”
    // }

    let [cDate, cTime] = formatAttendanceDate(data.check_in).split(' ');
    let [coDate, coTime] = formatAttendanceDate(data.check_out).split(' ');
    const payload = {
      attendance_date: jsDateToDDMMYYYY(data.attendance_date),
      correction_type: data.correction_type?.key,
      reason: data.reason,
      check_in: `${cDate.replaceAll(':', '/')} ${cTime}`,
      check_out: `${coDate.replaceAll(':', '/')} ${coTime}`,
    };
    console.log('payload: ', payload);
    mutate(payload, {
      onSuccess(success) {
        toastRef?.current?.showToast?.(
          'Attendance correction submitted successfully',
          'success',
        );
        console.log('success: ', success);
        navigation?.goBack?.();
        queryClient.invalidateQueries({
          queryKey: ['fetch/attendance-corrections'],
        });
      },
      onError(error) {
        console.log('ERROR: ', error);
        toastRef?.current?.showToast?.(
          error?.result?.errors
            ? Object.values(error?.result?.errors).join(', ')
            : error?.result?.message || 'Something went wrong',
          'error',
        );
      },
    });
  };
  return (
    <Container backgroundColor="background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <HMAForm data={formData} control={control} />
      </ScrollView>
      <HMAButton
        isLoading={isAttendanceCorrectionOptionsPending}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
      <Toast ref={toastRef} />
    </Container>
  );
}
