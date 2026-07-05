import { DocumentPickerResponse, pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { toByteArray } from 'base64-js';
import { useRef, useState } from 'react';
import RNFS from 'react-native-fs';
import { toastRefFn } from 'src/components/styled/atoms/toast';
import axiosInstance from 'src/services/axiosInstance';

const uploadEvidenceApi = async ({
  expenses_id,
  payload,
  mimeType,
}: {
  expenses_id: number;
  payload: any;
  mimeType: any;
}) => {
  return await axiosInstance.post(
    `/api/expenses/${expenses_id}/attachment`,
    payload,
    {
      headers: { 'Content-Type': mimeType },
      transformRequest: data => data,
    },
  );
};

export default function usePickAndUpload({
  expense_id,
}: {
  expense_id: number;
}) {
  const navigation = useNavigation();
  const toastRef = useRef<toastRefFn>(null);
  const [file, setFile] = useState<DocumentPickerResponse>();
  const { mutate: uploadEvidenceMutate, isPending: isLoadingEvidence } =
    useMutation({
      mutationKey: ['upload/evidence'],
      mutationFn: uploadEvidenceApi,
    });

  const handlePick = async () => {
    try {
      const result = await pick();
      setFile(result?.[0]);
    } catch (error) {
      console.log('ERROR WHILE PICK: ', error);
    }
  };

  const handleUpload = async () => {
    try {
      if (file) {
        let cFile = file;
        setFile(undefined);
        const base64Data = await RNFS.readFile(cFile.uri, 'base64');
        const buffer = toByteArray(base64Data).buffer; // returns Uint8Array directly
        const payload = {
          expenses_id: expense_id,
          mimeType: cFile?.type,
          payload: buffer,
        };
        console.log('payload: ', payload);
        uploadEvidenceMutate(payload, {
          onSuccess(data) {
            toastRef.current?.showToast?.(
              'Evidence attached successfully',
              'success',
            );
            console.log('UPLOAD SUCCESS: ', data);
            navigation?.goBack();
          },
          onError(error) {
            toastRef.current?.showToast?.('Something went wrong', 'error');

            console.log('UPLOAD ERROR: ', error);
          },
        });
      }
    } catch (error) {
      console.error('ERROR WHILE UPLOAD: ', error);
    }
  };

  return {
    handlePick,
    file,
    setFile,
    handleUpload,
    isLoadingEvidence,
    toastRef,
  };
}
