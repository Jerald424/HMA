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
  const { colors, spacing, metrics } = useTheme();
  const [reason, setReason] = useState('');

  const handleCancel = () => {
    cancelLeaveMutate(
      { leave_id: selectedLeaveRef?.current?.leave_id },
      {
        onSettled() {
          bsRef?.current?.close?.();
          selectedLeaveRef.current = null;
          setReason('');
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
        {/* Icon */}
        <Image
          style={{ height: 80, width: 80, alignSelf: 'center' }}
          source={require('src/assets/color-icons/revert.png')}
        />
        <HMADivider space="sm" />

        {/* Title */}
        <HMAText
          size="large"
          align="center"
          variant="title"
          style={{ fontWeight: '700' }}
        >
          Cancel Leave Request
        </HMAText>
        <HMADivider space="xs" />
        <HMAText color="textSecondary" align="center" size="small">
          This action cannot be undone. Please enter a reason.
        </HMAText>

        <HMADivider />

        {/* Reason input */}
        <HMATextInputMolecule
          value={reason}
          onChangeText={setReason}
          placeholder="Enter reason for cancellation"
          multiline
        />

        <HMADivider />

        {/* Buttons */}
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <HMAButton
            style={{ flex: 1 }}
            variant="outline"
            color="error"
            title="Go Back"
            onPress={() => bsRef?.current?.close?.()}
          />
          <HMAButton
            style={{ flex: 1 }}
            onPress={handleCancel}
            isLoading={isPending}
            color="error"
            title="Confirm Cancel"
          />
        </View>
      </View>
    </HMABottomSheet>
  );
}
