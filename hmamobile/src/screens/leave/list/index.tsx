import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, TextInput, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMABadge from 'src/components/styled/atoms/badge';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import Toast, { toastRefFn } from 'src/components/styled/atoms/toast';
import { makeColonDate, YYYYMMDDToJsDate } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import { useFocusEffect } from '@react-navigation/native';
import BalanceCards from './BalanceCards';
import LeaveCancel from './LeaveCancel';
import useLeaveList from './useLeaveList';

// ─── Status helpers ────────────────────────────────────────

const STATUS_LABEL: Record<string, string> = {
  pending_approval: 'Pending',
  approved: 'Approved',
  draft: 'Draft',
  cancelled: 'Cancelled',
  refused: 'Refused',
};

const STATUS_COLOR: Record<string, 'success' | 'error' | 'info' | 'warning'> = {
  pending_approval: 'warning',
  approved: 'success',
  draft: 'info',
  cancelled: 'error',
  refused: 'error',
};

// ─── Skeleton card ─────────────────────────────────────────

function SkeletonCard() {
  const { colors, spacing, metrics } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.lightBackground,
        borderRadius: metrics?.radius?.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        height: 120,
      }}
    />
  );
}

// ─── Individual leave card ─────────────────────────────────

const SepLeaveCard = ({
  leave,
  bsRef,
  selectedLeaveRef,
}: {
  leave: any;
  bsRef: any;
  selectedLeaveRef: any;
}) => {
  const { colors, spacing, metrics } = useTheme();

  const status = leave?.status ?? '';
  const statusLabel = STATUS_LABEL[status] ?? status;
  const statusColor = STATUS_COLOR[status] ?? 'info';

  const isShowCancel = useMemo(() => {
    if (status?.toLowerCase() === 'approved') {
      const sDate = YYYYMMDDToJsDate(leave?.start_date);
      const today = new Date();
      sDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return sDate > today;
    }
    return ['pending_approval', 'draft'].includes(status);
  }, [leave]);

  return (
    <HMACard
      cmpType="View"
      style={{
        padding: spacing.md,
        borderRadius: metrics?.radius?.lg,
        marginBottom: spacing.sm,
      }}
    >
      {/* ── Date range row ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.lightBackground,
            borderRadius: metrics?.radius?.md,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            gap: spacing.xs,
            flex: 1,
            marginRight: spacing.sm,
          }}
        >
          <HMAText size="small" style={{ fontWeight: '600' }}>
            {leave?.start_date ?? '—'}
          </HMAText>
          <HMAText color="textSecondary" size="small">
            →
          </HMAText>
          <HMAText size="small" style={{ fontWeight: '600' }}>
            {leave?.end_date ?? '—'}
          </HMAText>
          {leave?.half_day && (
            <HMABadge label="Half Day" style={{ marginLeft: spacing.xs }} />
          )}
        </View>

        {/* Status pill — top right */}
        <HMABadge
          color={statusColor}
          label={statusLabel}
          textProps={{ style: { textTransform: 'capitalize' } }}
        />
      </View>

      {/* ── Type + Reason ── */}
      <View style={{ gap: spacing.xs, marginBottom: spacing.sm }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
          }}
        >
          <HMAText color="textSecondary" size="small">
            Type
          </HMAText>
          <HMAText size="small" style={{ fontWeight: '500' }} numberOfLines={1}>
            {leave?.type ?? '—'}
          </HMAText>
        </View>

        {!!leave?.reason && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: spacing.xs,
            }}
          >
            <HMAText color="textSecondary" size="small">
              Reason
            </HMAText>
            <HMAText size="small" numberOfLines={2} style={{ flex: 1 }}>
              {leave.reason}
            </HMAText>
          </View>
        )}
      </View>

      {/* ── Divider ── */}
      <HMADivider thickness={1} space="sm" />

      {/* ── Approver row ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {!!leave?.approver ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.xs,
            }}
          >
            <HMAText color="textSecondary" size="small">
              Approver
            </HMAText>
            <HMABadge label={leave.approver} color="info" />
          </View>
        ) : (
          <HMAText color="textSecondary" size="small">
            No approver assigned
          </HMAText>
        )}

        {/* Cancel button — inline right */}
        {isShowCancel && (
          <HMAButton
            onPress={() => {
              selectedLeaveRef.current = leave;
              bsRef?.current?.open?.();
            }}
            variant="outline"
            size="sm"
            color="error"
            title="Cancel"
          />
        )}
      </View>
    </HMACard>
  );
};

// ─── Main screen ───────────────────────────────────────────

export default function LeaveList({ navigation }) {
  const toastRef = useRef<toastRefFn>(null);
  const bsRef = useRef(null);
  const selectedLeaveRef = useRef(null);
  const { spacing, colors, metrics } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const { leaveBalance, leaveHistory, isLoading, isLoadingHistory, refetch } =
    useLeaveList();

  const history = Array.isArray(leaveHistory?.data) ? leaveHistory.data : [];
  const leaveTypes = useMemo(
    () => [
      'All',
      ...Array.from(new Set(history.map(item => item?.type).filter(Boolean))),
    ],
    [history],
  );
  const invalidDateRange = Boolean(startDate && endDate && startDate > endDate);
  const filteredHistory = useMemo(
    () =>
      history.filter(item => {
        const itemStart = item?.start_date ?? '';
        const itemEnd = item?.end_date ?? itemStart;
        const validDate = value => !value || /^\d{4}-\d{2}-\d{2}$/.test(value);
        return (
          validDate(startDate) &&
          validDate(endDate) &&
          (!startDate || itemEnd >= startDate) &&
          (!endDate || itemStart <= endDate) &&
          (selectedType === 'All' || item?.type === selectedType) &&
          (selectedStatus === 'All' || item?.status === selectedStatus)
        );
      }),
    [history, startDate, endDate, selectedType, selectedStatus],
  );
  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedType('All');
    setSelectedStatus('All');
  };

  const handleSuccessCancel = () => {
    toastRef?.current?.showToast?.('Leave cancelled successfully.', 'success');
    refetch();
  };

  const handleFailureCancel = (error: any) => {
    toastRef?.current?.showToast?.(
      error?.message ?? 'Something went wrong',
      'error',
    );
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <Container padding={0}>
      <FlatList
        style={{ paddingHorizontal: spacing.md }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isLoading || isLoadingHistory}
          />
        }
        // Balance cards + History header as list header
        ListHeaderComponent={() => (
          <>
            <HMADivider space="sm" />

            {/* Balance cards */}
            <BalanceCards
              balances={leaveBalance?.balances}
              isLoading={isLoading}
            />

            <HMADivider space="sm" />

            {/* History label */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <HMAText
                size="small"
                color="textSecondary"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  fontWeight: '500',
                  flex: 1,
                }}
              >
                History
              </HMAText>
              <HMAButton
                title={showFilters ? 'Hide filters' : 'Filter history'}
                variant="ghost"
                size="sm"
                onPress={() => setShowFilters(value => !value)}
                // style={{ marginTop: spacing.sm }}
              />
            </View>
            {showFilters && (
              <View
                style={{
                  marginTop: spacing.sm,
                  padding: spacing.sm,
                  borderRadius: metrics?.radius?.md,
                  backgroundColor: colors.lightBackground,
                  gap: spacing.sm,
                }}
              >
                <HMAText size="small" color="textSecondary">
                  Date range (YYYY-MM-DD)
                </HMAText>
                <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                  <TextInput
                    value={startDate}
                    onChangeText={setStartDate}
                    placeholder="Start date"
                    keyboardType="numbers-and-punctuation"
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: metrics?.radius?.md,
                      padding: spacing.sm,
                      color: colors.text,
                    }}
                  />
                  <TextInput
                    value={endDate}
                    onChangeText={setEndDate}
                    placeholder="End date"
                    keyboardType="numbers-and-punctuation"
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: metrics?.radius?.md,
                      padding: spacing.sm,
                      color: colors.text,
                    }}
                  />
                </View>
                {invalidDateRange && (
                  <HMAText color="error" size="small">
                    Start date must be before end date.
                  </HMAText>
                )}
                <HMAText size="small" color="textSecondary">
                  Type
                </HMAText>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: spacing.xs,
                  }}
                >
                  {leaveTypes.map(value => (
                    <HMAButton
                      key={value}
                      title={value}
                      size="sm"
                      variant="outline"
                      color={selectedType === value ? 'info' : undefined}
                      onPress={() => setSelectedType(value)}
                    />
                  ))}
                </View>
                <HMAText size="small" color="textSecondary">
                  Status
                </HMAText>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: spacing.xs,
                  }}
                >
                  {['All', ...Object.keys(STATUS_LABEL)].map(value => (
                    <HMAButton
                      key={value}
                      title={value === 'All' ? value : STATUS_LABEL[value]}
                      size="sm"
                      variant="outline"
                      color={selectedStatus === value ? 'info' : undefined}
                      onPress={() => setSelectedStatus(value)}
                    />
                  ))}
                </View>
                <HMAButton
                  title="Clear filters"
                  variant="outline"
                  size="sm"
                  onPress={clearFilters}
                />
              </View>
            )}
            <HMADivider space="xs" />
          </>
        )}
        data={invalidDateRange ? [] : filteredHistory}
        keyExtractor={(item, index) => String(item?.leave_id ?? index)}
        renderItem={({ item }) => (
          <SepLeaveCard
            selectedLeaveRef={selectedLeaveRef}
            bsRef={bsRef}
            leave={item}
          />
        )}
        // ── Fallbacks ──
        ListEmptyComponent={() => {
          if (isLoadingHistory) {
            return (
              <>
                {[1, 2, 3].map(i => (
                  <SkeletonCard key={i} />
                ))}
              </>
            );
          }
          return <NoData />;
        }}
        contentContainerStyle={{ paddingBottom: 100 }} // space for button
      />

      {/* Sticky create button */}
      <HMAButton
        style={{ margin: spacing.md }}
        title="Apply Leave"
        onPress={() => navigation?.navigate('Leave Detail')}
      />

      <LeaveCancel
        handleSuccessCancel={handleSuccessCancel}
        handleFailureCancel={handleFailureCancel}
        selectedLeaveRef={selectedLeaveRef}
        bsRef={bsRef}
      />

      <Toast ref={toastRef} />
    </Container>
  );
}
