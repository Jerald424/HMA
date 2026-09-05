import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import useUserId from 'src/hooks/useUserId';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';
import { cStyle } from 'src/utils/style';

export type Approval = {
  id: string;
  type: string;
  employee: string;
  submitted: string;
  urgency?: string;
};

async function fetchPendingApprovals(managerId: number) {
  return axiosInstance.get(`/api/approvals/pending/${managerId}`);
}

export default function ApprovalsList({ navigation }) {
  const managerId = useUserId();
  const { spacing, metrics } = useTheme();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['pending-approvals', managerId],
    queryFn: () => fetchPendingApprovals(managerId as number),
    enabled: !!managerId,
  });
  const approvals: Approval[] = data?.pending ?? data?.result?.pending ?? [];
  console.log('data: ', data);
  return (
    <Container padding={0}>
      <FlatList
        data={approvals}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <HMAText size="title">
              Pending approvals ({approvals.length || 0})
            </HMAText>
            <HMAText
              color="textSecondary"
              size="small"
              style={{ marginTop: spacing.xs }}
            >
              Review requests from your team and record a decision.
            </HMAText>
          </View>
        }
        ListEmptyComponent={() => (isFetching ? null : <NoData />)}
        renderItem={({ item }) => (
          <TouchableOpacity
            // activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Approval Detail', { approval: item })
            }
          >
            <HMACard
              cmpType="View"
              style={{
                borderRadius: metrics.radius.lg,
                padding: spacing.md,
                marginBottom: spacing.sm,
                // ...metrics.shadow,
              }}
            >
              <View
                style={[cStyle.rowAlign, { justifyContent: 'space-between' }]}
              >
                <View style={{ flex: 1, paddingRight: spacing.sm }}>
                  <HMAText size="regular">{item.type}</HMAText>
                  <HMAText
                    color="textSecondary"
                    size="small"
                    style={{ marginTop: spacing.xs }}
                  >
                    {item.employee}
                  </HMAText>
                  <HMAText
                    color="textSecondary"
                    size="small"
                    style={{ marginTop: 2 }}
                  >
                    {item?.leave_from_date} to {item?.leave_to_date}
                  </HMAText>
                </View>
                <UrgencyBadge urgency={item.urgency} />
              </View>
            </HMACard>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

export function UrgencyBadge({ urgency }: { urgency?: string }) {
  const { colors, spacing, metrics } = useTheme();
  const isHigh = urgency === 'high';
  return (
    <View
      style={{
        backgroundColor: isHigh ? '#FDE8E8' : '#FFF4D9',
        borderRadius: metrics.radius.md,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
      }}
    >
      <HMAText
        size="small"
        style={{
          color: isHigh ? colors.error : '#A56412',
          // fontWeight: '600',
          textTransform: 'capitalize',
        }}
      >
        {urgency ?? 'normal'}
      </HMAText>
    </View>
  );
}
