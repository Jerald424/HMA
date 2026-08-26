import { useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { alertRefProp } from 'src/components/styled/template/modal/alert';
import axiosInstance from 'src/services/axiosInstance';
import useLoginSuccess from '../login/hooks/useLoginSuccess';

/*
“Params”: {
	“employee_id”: 20,
	“otp”: “117890”
}

*/
const verifyOtpApi = async (params: any) => {
  return await axiosInstance.post('api/employee/otp/verify', { params });
};

export const userLogin = async ({ token }: { token: string }) => {
  return await axiosInstance.post(
    '/api/employee/user-login',
    { params: {} },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

/* 
“Params”: {
	“employee_id”: 20
}

*/
const resendOtpApi = async (params: any) => {
  return await axiosInstance.post('/api/employee/otp/resend', { params });
};

export const useLoginOtp = () => {
  const [resendCount, setResendCount] = useState(0);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otp, setOtp] = useState('');
  const alertRef = useRef<alertRefProp>(null);
  const { onSuccess } = useLoginSuccess();

  const route = useRoute();

  const { mutate: verifyOtpMutate, isPending: isLoadingVerifyOtp } =
    useMutation({
      mutationKey: ['verify/otp'],
      mutationFn: verifyOtpApi,
    });

  const { mutate: loginMutate, isPending: isLoginMutate } = useMutation({
    mutationKey: ['user/login'],
    mutationFn: userLogin,
  });

  const { mutate: resendOtpMutate, isPending: isLoadingResend } = useMutation({
    mutationKey: ['resend/otp'],
    mutationFn: resendOtpApi,
  });

  const routeData = useMemo(() => {
    try {
      let data = JSON.parse(route.params);
      return data;
      //   return {
      //     employee_id: 134,
      //     employee_name: 'Testing Employee',
      //     expires_in_seconds: 300,
      //     masked_mobile: 'XXXXXXXXXX5012',
      //     message: 'OTP sent to XXXXXXXXXX5012. Valid for 5 minutes.',
      //     status: 'otp_sent',
      //   };
    } catch (error) {}
  }, []);

  const handleVerify = () => {
    verifyOtpMutate(
      {
        employee_id: routeData?.employee_id,
        otp,
      },
      {
        onSuccess(data) {
          console.log('SUCCESS OTP: ', data);
          loginMutate(
            {
              token: data?.result?.token,
            },
            {
              onSuccess(loginData) {
                onSuccess(data, loginData);
                console.log('loginData: ', loginData);

                console.log('LOGIN SUCCESS OTP: ', data);
                //                 {
                //     "jsonrpc": "2.0",
                //     "id": null,
                //     "result": {
                //         "status": "success",
                //         "message": "Welcome, Abdalrahman Amer Khaleel Faraj!",
                //         "token": "4e69b1fee8706ec56da8eca74c23e489f4ffe73203fc383d7c005b6930f69e1a",
                //         "expires_at": "2026-08-26 18:34:16.278062",
                //         "employee_id": 6111,
                //         "employee_name": "Abdalrahman Amer Khaleel Faraj"
                //     }
                // }
              },
              onError(error) {
                console.log('LOGIN ERROR OTP: ', error);
              },
            },
          );
        },
        onError(error) {
          console.log('ERROR OTP: ', error);
          alertRef.current?.showAlert?.({
            message: error?.result?.message || 'Something went wrong',
            title: 'OTP verify failed',
          });
        },
        onSettled() {
          setOtp('');
        },
      },
    );
  };

  const onResendInitiate = () => {
    setIsResendEnabled(false);
    setResendCount(prev => prev + 1);
    resendOtpMutate(
      {
        employee_id: routeData?.employee_id,
      },
      {
        onSuccess(data) {
          console.log('RESEND: DATA: ', data);
          alertRef.current?.showAlert?.({
            message: data?.result?.message || 'Otp send successfully!!',
            title: 'OTP resend successfully',
            variant: 'success',
          });
        },
        onError(error) {
          console.log('RESEND: ERROR: ', error);
          alertRef.current?.showAlert?.({
            message: error?.result?.message || 'Something went wrong',
            title: 'OTP resend failed',
          });
        },
        onSettled() {
          setOtp('');
        },
      },
    );
  };

  return {
    isLoadingVerifyOtp: isLoadingVerifyOtp || isLoginMutate,
    isLoadingResend,
    resendCount,
    isResendEnabled,
    handleVerify,
    onResendInitiate,
    routeData,
    otp,
    setOtp,
    setIsResendEnabled,
    alertRef,
  };
};
