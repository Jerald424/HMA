import { FlatList, RefreshControl, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMAButton from 'src/components/styled/atoms/button';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import { useTheme } from 'src/hooks/useTheme';
import useRequestList from './useLeaveList';
import HMAText from 'src/components/styled/atoms/text';
import HMABadge from 'src/components/styled/atoms/badge';

const leaveStatusMap = {
  pending_approval: 'Pending Approval',
  approved: 'Approved',
};

export default function RequestList({ navigation }) {
  const { colors, spacing } = useTheme();
  const { requestHistory, refetch, isRequestHistory } = useRequestList();

  console.log('requestHistory: ', requestHistory);

  return (
    <Container>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isRequestHistory} />
        }
        data={requestHistory?.data}
        renderItem={({ item }) => <SepRequestCard item={item} />}
        ListEmptyComponent={() => (isRequestHistory ? <></> : <NoData />)}
      />
      <HMAButton
        // style={{ margin: spacing.md }}
        title="Create"
        onPress={() => navigation?.navigate('Request Create')}
      />
    </Container>
  );
}

const SepRequestCard = ({ item }: { item: any }) => {
  const { colors, spacing } = useTheme();

  return (
    <>
      <HMACard cmpType="View" style={{ padding: spacing?.md }}>
        <HMAText>{item?.type}</HMAText>
        <HMADivider space={'sm'} thickness={1} />

        <HMAText
          variant="regular"
          size="small"
          style={{ textTransform: 'capitalize' }}
        >
          Status: {item?.status?.split('_')?.join(' ')}
        </HMAText>
        <HMAText variant="regular" size="small">
          Submitted: {item?.submitted}
        </HMAText>
        <HMADivider />

        <HMAText>Approval Chain: {item?.approval_chain?.join(' ➡️ ')}</HMAText>
      </HMACard>
      <HMADivider />
    </>
  );
};
