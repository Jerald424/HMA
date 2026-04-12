import { useForm } from 'react-hook-form';
import { formDataProps } from 'src/components/styled/organism/form';

const leave_types = [
  { label: 'Casual Leave', value: 'CL' },
  { label: 'Loss Of Pay', value: 'LOP' },
];

const sessions = [
  { label: 'Morning', value: 'morning' },
  { label: 'Evening', value: 'evening' },
];

export default function useCreate() {
  const { control, handleSubmit, reset } = useForm();

  const formData: formDataProps = [
    {
      inputType: 'drop-down',
      name: 'leave_type',
      dropdownProps: {
        placeholder: 'Select Leave Type',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Select Leave Type',
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
      name: 'start_date',
      datePickerProps: {
        mode: 'date',
      },
      rules: {
        required: {
          value: true,
          message: 'Start date is required',
        },
      },
    },
    {
      inputType: 'drop-down',
      name: 'start_session',
      dropdownProps: {
        placeholder: 'Select start session',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Select start session',
        },
        options: sessions,
      },
      rules: {
        required: {
          value: true,
          message: 'Start session is required',
        },
      },
    },
    {
      inputType: 'date-picker',
      name: 'end_date',
      datePickerProps: {
        mode: 'date',
      },
      rules: {
        required: {
          value: true,
          message: 'End date is required',
        },
      },
    },
    {
      inputType: 'drop-down',
      name: 'end_session',
      dropdownProps: {
        placeholder: 'Select end session',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Select end session',
        },
        options: sessions,
      },
      rules: {
        required: {
          value: true,
          message: 'End session is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'reason',
      textInputProps: {
        placeholder: 'Enter reason',
        multiline: true,
        style: {
          height: 80,
          textAlignVertical: 'top',
        },
      },
    },
  ];

  const onSubmit = () => {};

  return {
    formData,
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
}
