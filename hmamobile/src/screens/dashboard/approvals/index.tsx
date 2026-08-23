import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import axiosInstance from 'src/services/axiosInstance';
import { cStyle } from 'src/utils/style';

type Approval = {
  id: string;
  type: string;
  employee: string;
  submitted: string;
  urgency?: 'high' | 'normal' | string;
};

async function fetchPendingApprovals(managerId: number | string) {
  return axiosInstance.get(`/api/approvals/pending/${managerId}`);
}

export default function PendingApprovals({
  managerId,
}: {
  managerId?: number;
}) {
  const { colors, spacing, metrics } = useTheme();
  const navigation = useNavigation();
  const { data, isPending } = useQuery({
    queryKey: ['pending-approvals', managerId],
    queryFn: () => fetchPendingApprovals(managerId as number),
    enabled: !!managerId,
  });

  const approvals: Approval[] = data?.pending ?? data?.result?.pending ?? [];
  const total = data?.total ?? data?.result?.total ?? approvals.length;

  if (isPending || approvals.length === 0) return null;

  return (
    <View>
      <View
        style={[
          cStyle.rowAlign,
          { justifyContent: 'space-between', marginBottom: spacing.sm },
        ]}
      >
        <HMAText>Approvals awaiting you</HMAText>
        <TouchableOpacity onPress={() => navigation.navigate('Approvals')}>
          <HMAText color="primary" size="small">
            View all ({total})
          </HMAText>
        </TouchableOpacity>
      </View>

      {approvals.slice(0, 2).map(approval => (
        <TouchableOpacity
          key={approval.id}
          // activeOpacity={0.8}
          onPress={() => navigation.navigate('Approval Detail', { approval })}
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
                <HMAText
                  size="regular"
                  numberOfLines={1}
                  // style={{ fontWeight: '700' }}
                >
                  {approval.type}
                </HMAText>
                <HMAText
                  color="textSecondary"
                  size="small"
                  style={{ marginTop: 2 }}
                >
                  {approval.employee} · Submitted {approval.submitted}
                </HMAText>
              </View>
              <View
                style={{
                  backgroundColor:
                    approval.urgency === 'high' ? '#FDE8E8' : '#FFF4D9',
                  borderRadius: metrics.radius.md,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                }}
              >
                <HMAText
                  size="small"
                  style={{
                    color:
                      approval.urgency === 'high' ? colors.error : '#A56412',
                    // fontWeight: '600',
                    textTransform: 'capitalize',
                  }}
                >
                  {approval.urgency ?? 'normal'}
                </HMAText>
              </View>
            </View>
          </HMACard>
        </TouchableOpacity>
      ))}
    </View>
  );
}
