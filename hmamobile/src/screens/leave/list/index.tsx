import { useMemo, useRef } from 'react';
import { FlatList, Image, RefreshControl, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMABadge from 'src/components/styled/atoms/badge';
import HMABottomSheet from 'src/components/styled/atoms/bottomSheet';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import { useTheme } from 'src/hooks/useTheme';
import BalanceCards from './BalanceCards';
import useLeaveList from './useLeaveList';
import LeaveCancel from './LeaveCancel';
import Toast, { toastRefFn } from 'src/components/styled/atoms/toast';
import { makeColonDate, YYYYMMDDToJsDate } from 'src/function/dateConversion';

const leaveStatusMap = {
  pending_approval: 'Pending Approval',
  approved: 'Approved',
};

export default function LeaveList({ navigation }) {
  const toastRef = useRef<toastRefFn>(null);
  const bsRef = useRef(null);
  const selectedLeaveRef = useRef(null);
  const { colors, spacing } = useTheme();
  const { leaveBalance, leaveHistory, isLoading, isLoadingHistory, refetch } =
    useLeaveList();

  console.log('leaveHistory: ', leaveHistory);

  const handleSuccessCancel = () => {
    toastRef?.current?.showToast?.(
      'Leave cancelled successfully!!.',
      'success',
    );
    refetch();
  };
  const handleFailureCancel = (error: any) => {
    toastRef?.current?.showToast?.(
      error?.message ?? 'Something went wrong',
      'error',
    );
    refetch();
  };

  return (
    <Container padding={0}>
      <View style={{ padding: spacing.md }}>
        <BalanceCards balances={leaveBalance?.balances} />
      </View>
      <HMAText size="large" style={{ marginLeft: spacing.md }}>
        History
      </HMAText>
      <HMADivider />

      <FlatList
        style={{ paddingHorizontal: spacing.md }}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isLoading || isLoadingHistory}
          />
        }
        data={leaveHistory?.data}
        renderItem={({ item }) => (
          <SepLeaveCard
            selectedLeaveRef={selectedLeaveRef}
            bsRef={bsRef}
            leave={item}
          />
        )}
        ListEmptyComponent={() => (isLoadingHistory ? <></> : <NoData />)}
      />
      <HMAButton
        style={{ margin: spacing.md }}
        title="Create"
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

const SepLeaveCard = ({
  leave,
  bsRef,
  selectedLeaveRef,
}: {
  leave: any;
  bsRef: any;
  selectedLeaveRef: any;
}) => {
  const { colors, spacing } = useTheme();

  const isShowCancel = useMemo(() => {
    if (leave?.status?.toLowerCase() == 'approved') {
      const sDate = YYYYMMDDToJsDate(leave?.start_date);
      const today = new Date();
      sDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return sDate > today;
    }
    return ['pending_approval', 'draft'].includes(leave?.status);
  }, [leave]);

  return (
    <>
      <HMACard cmpType="View" style={{ padding: spacing?.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <HMAText>
            {leave?.start_date} ➡️ {leave?.end_date}
          </HMAText>
          {leave?.half_day && (
            <HMABadge label={'Half Day'} style={{ marginLeft: spacing.sm }} />
          )}
        </View>
        <HMADivider thickness={1} space={'sm'} />
        <HMAText>Type: {leave?.type}</HMAText>
        <HMADivider />
        <HMAText numberOfLines={2}>Reason: {leave?.reason}</HMAText>
        <HMADivider />

        <View style={{ flexDirection: 'row' }}>
          <HMABadge
            color={
              leave?.status?.toUpperCase() == 'APPROVED' ? 'success' : 'error'
            }
            label={leaveStatusMap?.[leave?.status] ?? leave?.status}
            textProps={{ style: { textTransform: 'capitalize' } }}
          />
          <HMADivider variant="vertical" />
          <HMABadge label={leave?.approver} color="info" />
        </View>
        {isShowCancel && (
          <>
            <HMADivider />
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
          </>
        )}
      </HMACard>
      <HMADivider />
    </>
  );
};
