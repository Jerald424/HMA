import { ScrollView, View } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

type Balance = {
  type: string;
  entitled?: number | string;
  taken?: number | string;
  remaining?: number | string;
};

function BalanceSkeleton() {
  const { spacing, metrics, colors } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ gap: spacing.md }}
    >
      {[1, 2, 3].map(i => (
        <View
          key={i}
          style={{
            width: 150,
            height: 110,
            borderRadius: metrics?.radius?.lg,
            backgroundColor: colors.lightBackground,
          }}
        />
      ))}
    </ScrollView>
  );
}

export default function BalanceCards({
  balances,
  isLoading,
}: {
  balances: Balance[] | undefined;
  isLoading?: boolean;
}) {
  const { spacing, metrics, colors } = useTheme();

  if (isLoading) return <BalanceSkeleton />;

  if (!balances || balances.length === 0) {
    return (
      <HMACard
        style={{ padding: spacing.md, borderRadius: metrics?.radius?.lg }}
      >
        <HMAText color="textSecondary" align="center" size="small">
          No leave balance available
        </HMAText>
      </HMACard>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ gap: spacing.md }}
    >
      {balances.map((balance, index) => {
        const remaining = balance?.remaining ?? balance?.entitled;
        const entitled = balance?.entitled;
        const taken = balance?.taken;

        return (
          <HMACard
            key={balance?.type + index}
            style={{
              padding: spacing.md,
              width: 155,
              borderRadius: metrics?.radius?.lg,
            }}
          >
            {/* Leave type */}
            <HMAText
              variant="title"
              size="small"
              align="center"
              style={{ fontWeight: '700', lineHeight: 18 }}
              numberOfLines={2}
            >
              {balance?.type}
            </HMAText>

            <HMADivider thickness={1} space="sm" />

            {/* Remaining — most important, largest */}
            <HMAText
              size="title"
              align="center"
              color="primary"
              style={{ fontWeight: '700' }}
            >
              {remaining ?? '—'}
            </HMAText>
            <HMAText color="textSecondary" size="small" align="center">
              remaining
            </HMAText>

            <HMADivider space="xs" />

            {/* Entitled + Taken row */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ alignItems: 'center', flex: 1 }}>
                <HMAText size="small" style={{ fontWeight: '600' }}>
                  {entitled ?? '—'}
                </HMAText>
                <HMAText color="textSecondary" size="small">
                  Entitled
                </HMAText>
              </View>
              <View
                style={{
                  width: 0.5,
                  backgroundColor: colors.border,
                  alignSelf: 'stretch',
                }}
              />
              <View style={{ alignItems: 'center', flex: 1 }}>
                <HMAText size="small" style={{ fontWeight: '600' }}>
                  {taken ?? '—'}
                </HMAText>
                <HMAText color="textSecondary" size="small">
                  Taken
                </HMAText>
              </View>
            </View>
          </HMACard>
        );
      })}
    </ScrollView>
  );
}
