import { useNavigation } from '@react-navigation/native';
import { FlatList, RefreshControl, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import useAdvanceSalaryList from './useAdvanceSalaryList';

// ─── Types ────────────────────────────────────────────────

type AdvanceRecord = {
  id: number;
  reference: string;
  advance: number;
  date: string;
  reason: string;
  state: 'draft' | 'submit' | 'approve' | 'refuse' | string;
};

// ─── Helpers ──────────────────────────────────────────────

const STATE_LABEL: Record<string, string> = {
  draft: 'Draft',
  submit: 'Pending',
  approve: 'Approved',
  refuse: 'Refused',
};

const STATE_COLOR: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
  draft: 'info',
  submit: 'warning',
  approve: 'success',
  refuse: 'error',
};

/** "2026-09-16" → "16 Sep 2026" */
const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? dateStr
    : d.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
};

/** 6000 → "6,000" */
const formatAmount = (n: number): string => n?.toLocaleString('en-US') ?? '0';

// ─── Summary strip ────────────────────────────────────────

function SummaryStrip({ data }: { data: AdvanceRecord[] }) {
  const { spacing, metrics, colors } = useTheme();

  const total = data.length;
  const approved = data.filter(d => d.state === 'approve').length;
  const pending = data.filter(d => d.state === 'submit').length;
  const totalAmt = data.reduce((sum, d) => sum + (d.advance ?? 0), 0);

  const items = [
    { label: 'Total', value: String(total), color: colors.textPrimary },
    { label: 'Approved', value: String(approved), color: colors.success },
    { label: 'Pending', value: String(pending), color: colors.warning },
    {
      label: 'Total Amt',
      value: formatAmount(totalAmt),
      color: colors.primary,
    },
  ];

  return (
    <View style={[cStyle.row, { gap: spacing.sm, marginBottom: spacing.md }]}>
      {items.map(item => (
        <HMACard
          key={item.label}
          cmpType="View"
          style={{
            flex: 1,
            padding: spacing.sm,
            borderRadius: metrics?.radius?.lg,
            alignItems: 'center',
          }}
        >
          <HMAText size="large" style={{ color: item.color }}>
            {item.value}
          </HMAText>
          <HMAText color="textSecondary" size="small">
            {item.label}
          </HMAText>
        </HMACard>
      ))}
    </View>
  );
}

// ─── Skeleton ─────────────────────────────────────────────

function SkeletonCard() {
  const { colors, spacing, metrics } = useTheme();
  return (
    <View
      style={{
        height: 120,
        backgroundColor: colors.lightBackground,
        borderRadius: metrics?.radius?.lg,
        marginBottom: spacing.sm,
      }}
    />
  );
}

// ─── Single advance card ──────────────────────────────────

function AdvanceCard({ item }: { item: AdvanceRecord }) {
  const { colors, spacing, metrics } = useTheme();

  const stateLabel = STATE_LABEL[item.state] ?? item.state;
  const stateColor = STATE_COLOR[item.state] ?? 'info';
  const hasReason = !!item.reason?.trim();

  return (
    <HMACard
      cmpType="View"
      style={{
        padding: spacing.md,
        borderRadius: metrics?.radius?.lg,
        marginBottom: spacing.sm,
      }}
    >
      {/* ── Top: reference + date + status ── */}
      <View
        style={[
          cStyle.rowAlign,
          { justifyContent: 'space-between', marginBottom: spacing.sm },
        ]}
      >
        <View>
          <HMAText size="small" color="textSecondary">
            {item.reference}
          </HMAText>
          <HMAText size="small" style={{}}>
            {formatDate(item.date)}
          </HMAText>
        </View>
        <HMABadge
          color={stateColor}
          label={stateLabel}
          textProps={{ style: { textTransform: 'capitalize' } }}
        />
      </View>

      {/* ── Amount ── */}
      <View
        style={[
          cStyle.rowAlign,
          { alignItems: 'baseline', gap: spacing.xs, marginBottom: spacing.sm },
        ]}
      >
        <HMAText size="title">{formatAmount(item.advance)}</HMAText>
        {/* <HMAText color="textSecondary" size="small">
          QAR
        </HMAText> */}
      </View>

      {/* ── Reason ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: spacing.xs,
          backgroundColor: colors.lightBackground,
          borderRadius: metrics?.radius?.md,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
        }}
      >
        <HMAText color="textSecondary" size="small">
          Reason
        </HMAText>
        <HMAText
          size="small"
          numberOfLines={2}
          style={{
            flex: 1,
            fontStyle: hasReason ? 'normal' : 'italic',
            color: hasReason ? undefined : colors.textSecondary,
          }}
        >
          {hasReason ? item.reason : 'No reason provided'}
        </HMAText>
      </View>
    </HMACard>
  );
}

// ─── Main screen ──────────────────────────────────────────

export default function AdvanceSalaryList({ navigation }) {
  const { spacing } = useTheme();
  const { data, isLoading, refetch } = useAdvanceSalaryList();
  // Replace with your actual hook/query
  //   const data: AdvanceRecord[] = [
  //     {
  //       id: 193,
  //       reference: 'SAR0027',
  //       advance: 150,
  //       date: '2026-09-16',
  //       reason: '',
  //       state: 'submit',
  //     },
  //     {
  //       id: 104,
  //       reference: 'SAR0075',
  //       advance: 6000,
  //       date: '2026-06-12',
  //       reason: 'House maintenance ',
  //       state: 'approve',
  //     },
  //   ];

  return (
    <Container padding={0}>
      <FlatList
        style={{ paddingHorizontal: spacing.md }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
        ListHeaderComponent={() => (
          <>
            <HMADivider space="sm" />
            {data?.length > 0 && <SummaryStrip data={data} />}
            <HMAText
              size="small"
              color="textSecondary"
              style={{
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              Requests
            </HMAText>
            <HMADivider space="xs" />
          </>
        )}
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <AdvanceCard item={item} />}
        ListEmptyComponent={() =>
          isLoading ? (
            <>
              {[1, 2, 3].map(i => (
                <SkeletonCard key={i} />
              ))}
            </>
          ) : (
            // Replace with your NoData component
            <NoData message="No advance requests found" />
          )
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Sticky create button */}
      <HMAButton
        style={{ margin: spacing.md }}
        title="New Advance Request"
        onPress={() => navigation?.navigate('AdvanceSalaryDetail')}
      />
    </Container>
  );
}
