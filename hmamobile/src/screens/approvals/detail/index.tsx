import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import useUserId from 'src/hooks/useUserId';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';
import { Approval, UrgencyBadge } from '../list';
import HMATextInput from 'src/components/styled/atoms/input';

type Action = 'approve' | 'reject';

async function submitAction({
  requestId,
  action,
  comments,
  managerId,
}: {
  requestId: string;
  action: Action;
  comments: string;
  managerId?: number;
}) {
  return axiosInstance.post(`/api/approvals/${requestId}/action`, {
    action,
    comments,
    // actioned_by: managerId,
  });
}

export default function ApprovalDetail({ navigation, route }) {
  const approval: Approval = route.params.approval;
  console.log('approval: ', approval);
  const managerId = useUserId();
  const { colors, spacing, metrics } = useTheme();
  const queryClient = useQueryClient();
  const [comments, setComments] = useState('');
  const mutation = useMutation({
    mutationFn: submitAction,
    onSuccess: (data, variables) => {
      console.log('approve data: ', data);
      queryClient.invalidateQueries({
        queryKey: ['pending-approvals', managerId],
      });
      Alert.alert(
        variables.action === 'approve'
          ? 'Request approved'
          : 'Request rejected',
        'The employee will be notified of your decision.',
        [{ text: 'Done', onPress: () => navigation.goBack() }],
      );
    },
    onError: error => {
      console.log('approve error: ', error);
      Alert.alert(
        'Could not save decision',
        error?.message ?? 'Please try again.',
      );
    },
  });
  const confirmAction = (action: Action) =>
    Alert.alert(
      action === 'approve' ? 'Approve request?' : 'Reject request?',
      action === 'approve'
        ? 'This will move the request to the next approval step.'
        : 'The request will be declined and the employee notified.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action === 'approve' ? 'Approve' : 'Reject',
          style: action === 'approve' ? 'default' : 'destructive',
          onPress: () =>
            mutation.mutate({
              requestId: approval.id,
              action,
              comments,
              managerId,
            }),
        },
      ],
    );

  return (
    <Container padding={0}>
      <View style={{ flex: 1, padding: spacing.md }}>
        <HMACard
          cmpType="View"
          style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <HMAText size="title">{approval.type}</HMAText>
              <HMAText color="textSecondary" style={{ marginTop: spacing.xs }}>
                {approval.employee}
              </HMAText>
            </View>
            <UrgencyBadge urgency={approval.urgency} />
          </View>
          <HMADivider thickness={1} space="sm" />
          <DetailRow label="Request ID" value={approval.id} />
          <DetailRow label="Submitted" value={approval.submitted} />
          <DetailRow label="Reason" value={approval.reason} />
        </HMACard>

        <HMAText size="regular" style={{ marginTop: spacing.lg }}>
          Decision note (optional)
        </HMAText>
        <HMATextInput
          value={comments}
          onChangeText={setComments}
          multiline
          placeholder="Add context for the employee or next approver"
          style={{
            minHeight: 112,
            marginTop: spacing.sm,
            padding: spacing.md,
            borderRadius: metrics.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.background,
            color: colors.textPrimary,
            textAlignVertical: 'top',
          }}
        />

        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <HMAButton
            title="Reject"
            color="error"
            variant="outline"
            isLoading={mutation.isPending}
            onPress={() => confirmAction('reject')}
            style={{ flex: 1 }}
          />
          <HMAButton
            title="Approve"
            color="success"
            isLoading={mutation.isPending}
            onPress={() => confirmAction('approve')}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </Container>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const { spacing } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: spacing.sm,
      }}
    >
      <HMAText style={{ flex: 1 }} color="textSecondary" size="small">
        {label}
      </HMAText>
      <HMAText style={{ flex: 1 }} size="small">
        {value}
      </HMAText>
    </View>
  );
}
