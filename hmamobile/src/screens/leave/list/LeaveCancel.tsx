import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Image, View } from 'react-native';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMAButton from 'src/components/styled/atoms/button';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';

const cancelLeave = async ({ leave_id }: { leave_id: number }) => {
  return await axiosInstance.put(`/api/leaves/${leave_id}/cancel`);
};

export default function LeaveCancel({
  bsRef,
  selectedLeaveRef,
  handleSuccessCancel,
  handleFailureCancel,
}: {
  bsRef: any;
  selectedLeaveRef: any;
  handleSuccessCancel: any;
  handleFailureCancel: any;
}) {
  const { mutate: cancelLeaveMutate, isPending } = useMutation({
    mutationKey: ['cancel/leave'],
    mutationFn: cancelLeave,
  });
  const { colors, spacing } = useTheme();
  const [reason, setReason] = useState('');

  const handleCancel = () => {
    cancelLeaveMutate(
      { leave_id: selectedLeaveRef?.current?.leave_id },
      {
        onSettled() {
          bsRef?.current?.close?.();
          selectedLeaveRef.current = null;
        },
        onError(error) {
          handleFailureCancel?.(error);
        },
        onSuccess() {
          handleSuccessCancel?.();
        },
      },
    );
  };

  return (
    <HMABottomSheet ref={bsRef}>
      <View style={{ padding: spacing.md }}>
        <HMATextInputMolecule
          value={reason}
          onChangeText={setReason}
          placeholder="Enter reason"
        />
        <HMADivider />
        <Image
          style={{ height: 100, width: 100, alignSelf: 'center' }}
          source={require('src/assets/color-icons/revert.png')}
        />
        <HMADivider />
        <HMAText align="center">
          Are you sure do you want to cancel leave request?
        </HMAText>
        <HMADivider />

        <HMAButton
          onPress={handleCancel}
          isLoading={isPending}
          title="Submit"
        />
      </View>
    </HMABottomSheet>
  );
}
