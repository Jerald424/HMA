import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function LeaveInfo() {
  const { colors, spacing, metrics } = useTheme();
  const { data } = useUserInfo();
  const navigation = useNavigation();

  const leaveInfo  = data?.result?.data?.leave_info;
  const remaining  = leaveInfo?.total_remaining  ?? 0;
  const taken      = leaveInfo?.total_taken      ?? 0;
  const allocated  = leaveInfo?.total_allocated  ?? 0;
  const pending    = leaveInfo?.total_pending    ?? 0;

  const usedPct = allocated > 0
    ? Math.min(Math.round((taken / allocated) * 100), 100)
    : 0;

  const stats = [
    { label: 'Remaining', value: remaining },
    { label: 'Taken',     value: taken     },
    { label: 'Allocated', value: allocated },
  ];

  return (
    <HMACard style={{ padding: spacing.md, borderRadius: metrics.radius.lg }}>

      {/* Header row */}
      <View style={[cStyle.rowAlign, { justifyContent: 'space-between' }]}>
        <HMAText
          color="textSecondary"
          size="small"
          style={{ textTransform: 'uppercase', letterSpacing: 0.6 }}
        >
          Leave Balance
        </HMAText>
        <TouchableOpacity onPress={() => navigation?.navigate('Leave')}>
          <HMAText color="primary" size="small" style={{ fontWeight: '600' }}>
            Apply →
          </HMAText>
        </TouchableOpacity>
      </View>

      <HMADivider thickness={1} />

      {/* Stats — 3 columns with vertical separators */}
      <View style={[cStyle.rowAlign, { justifyContent: 'space-between' }]}>
        {stats.map((item, index) => (
          <View
            key={item.label}
            style={[
              { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
              index > 0 && {
                borderLeftWidth: 0.5,
                borderLeftColor: colors.border,
              },
            ]}
          >
            <HMAText size="title" style={{ fontWeight: '700' }}>
              {item.value.toFixed(1)}
            </HMAText>
            <HMAText color="textSecondary" size="small">
              {item.label}
            </HMAText>
          </View>
        ))}
      </View>

      <HMADivider space="xs" />

      {/* Progress bar label */}
      <View style={[cStyle.rowAlign, { justifyContent: 'space-between', marginBottom: spacing.xs }]}>
        <HMAText color="textSecondary" size="small">
          Used: {taken.toFixed(1)} days
        </HMAText>
        <HMAText color="textSecondary" size="small">
          {taken.toFixed(1)} / {allocated.toFixed(1)} days
        </HMAText>
      </View>

      {/* Progress bar */}
      <View
        style={{
          height: 5,
          backgroundColor: colors.lightBackground,
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${usedPct}%`,
            backgroundColor: colors.primary,
            borderRadius: 99,
          }}
        />
      </View>

      {/* Pending note */}
      {pending > 0 && (
        <>
          <HMADivider space="xs" />
          <HMAText color="textSecondary" size="small">
            {pending.toFixed(1)} days pending approval
          </HMAText>
        </>
      )}
    </HMACard>
  );
}
