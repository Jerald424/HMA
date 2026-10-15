import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toastRefFn } from 'src/components/styled/atoms/toast';
import { formDataProps } from 'src/components/styled/organism/form';

export default function useResignationCreate() {
  const { control, handleSubmit } = useForm();
  const toastRef = useRef<toastRefFn>(null);
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
        options: [],
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

  return {
    control,
    handleSubmit: handleSubmit(() => {}),
    formData,
    toastRef,
  };
}
