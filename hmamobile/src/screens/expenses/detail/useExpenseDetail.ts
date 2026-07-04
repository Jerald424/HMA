import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toastRefFn } from 'src/components/styled/atoms/toast';
import { formDataProps } from 'src/components/styled/organism/form';
import { jsDateToYYYYMMDD } from 'src/function/dateConversion';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

const fetchExpCategory = async () => {
  return await axiosInstance.get('api/expenses/categories');
};

/* 
{
	“employee_id”: 20,
	“Categorie_id”: 62,
	“Name”: “Office Manager”,
	“Date”: “2026-06-15”,
	“Quantity”: 1.0,
	“Total_amount”: 100.00,
	“Payment_mode”: “own_amount”,
	“Description”: “Team Lunch With Manager”
}

*/
const createEditExpense = async (payload: any) => {
  const method = payload?.expense_id ? 'put' : 'post';
  const url = payload?.expense_id
    ? `/api/expenses/${payload?.expense_id}`
    : `/api/expenses/request`;
  return await axiosInstance[method](url, payload);
};

export default function useExpenseDetail() {
  const employee_id = useUserId();
  const toastRef = useRef<toastRefFn>(null);
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      date: new Date(),
    },
  });

  const { data: expCategory, isLoading: isLoadingExpCategory } = useQuery({
    queryKey: ['exp/category'],
    queryFn: fetchExpCategory,
  });

  const { mutate: createEditExpenseMute, isPending: isLoadingExpUpdating } =
    useMutation({
      mutationKey: ['create/edit-expense'],
      mutationFn: createEditExpense,
    });

  const formData: formDataProps = [
    {
      inputType: 'drop-down',
      name: 'categorie_id',
      dropdownProps: {
        placeholder: 'Select category',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Select category',
        },
        options: expCategory,
        optionalLabel: 'name',
        optionalValue: 'id',
      },
      rules: {
        required: {
          value: true,
          message: 'Category is required',
        },
      },
    },
    {
      inputType: 'date-picker',
      name: 'date',
      datePickerProps: {
        mode: 'date',
      },
      rules: {
        required: {
          value: true,
          message: 'Date is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'total_amount',
      textInputProps: {
        placeholder: 'Enter total amount',
        inputMode: 'decimal',
      },
      rules: {
        required: {
          value: true,
          message: 'Total amount is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'description',
      textInputProps: {
        placeholder: 'Enter description',
        multiline: true,
        style: {
          height: 80,
          textAlignVertical: 'top',
        },
      },
    },
  ];

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      categorie_id: data?.categorie_id?.id,
      date: jsDateToYYYYMMDD(data?.date),
      employee_id,
      quantity: 1,
      payment_mode: 'own_account',
      name: 'testemployee',
    };
    console.log('payload: ', payload);
    createEditExpenseMute(payload, {
      onSuccess(data) {
        console.log('data: ', data);
        navigation?.goBack();
      },
      onError(error) {
        console.log('ERROR: ', error);
        toastRef?.current?.showToast?.(
          error?.message || 'Something went wrong',
          'error',
        );
      },
    });
  };

  return {
    formData,
    isLoadingExpCategory,
    isLoadingExpUpdating,
    control,
    handleSubmit: handleSubmit(onSubmit),
    toastRef,
  };
}
